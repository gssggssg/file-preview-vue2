<template>
  <div class="view-wrapper">
    <div class="search-bar">
      <input
        type="text"
        v-model="searchText"
        placeholder="搜索 PDF"
        @input="handleSearchInput"
        @keyup.enter="searchPdf"
      >
      <button @click="searchPdf" :disabled="isSearching">
        {{ isSearching ? '搜索中...' : '搜索' }}
      </button>
      <span v-if="searchResults.length" class="search-count">
        共找到 {{ totalMatches }} 处匹配
      </span>
      <span v-if="isSearching" class="search-status">正在搜索...</span>
    </div>

    <div class="box">
      <div class="pdf-container">
        <canvas
          v-for="page in pages"
          :id="'the-canvas'+page"
          :key="page"
          :data-page="page"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import * as PDFJS from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

PDFJS.workerSrc = workerSrc;

export default {
  name: 'PdfViewer',
  props: {
    fileUrl: {
      type: String,
      required: true
    },
    maxSearchPages: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      pdfDoc: null,
      pages: [],
      searchText: '',
      searchResults: [],
      currentHighlight: null,
      searchDebounce: null,
      isDestroyed: false,
      totalMatches: 0,
      isSearching: false
    }
  },
  watch: {
    fileUrl: {
      immediate: true,
      handler(newUrl) {
        if (newUrl) {
          this.loadPdf(newUrl);
        }
      }
    }
  },
  methods: {
    async loadPdf(url) {
      try {
        this.resetState();
        const pdf = await PDFJS.getDocument({
          url,
          cMapPacked: true,
          cMapUrl: 'https://unpkg.com/pdfjs-dist@2.10.377/cmaps/'
        }).promise;

        this.pdfDoc = pdf;
        this.pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);

        await this.renderAllPages();
      } catch (error) {
        console.error('PDF加载失败:', error);
      }
    },

    resetState() {
      this.searchResults = [];
      this.totalMatches = 0;
      this.searchText = '';
      this.isSearching = false;
      clearTimeout(this.searchDebounce);
    },

    async renderAllPages() {
      for (const pageNumber of this.pages) {
        await this.renderPage(pageNumber);
      }
    },

    async renderPage(pageNumber, clearHighlight = true) {
      if (!this.pdfDoc || this.isDestroyed) return;

      try {
        const page = await this.pdfDoc.getPage(pageNumber);
        const canvasId = `the-canvas${pageNumber}`;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const viewport = page.getViewport({
          scale: this.calculateScale(page)
        });

        this.adjustCanvasSize(canvas, viewport);

        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;

        if (!clearHighlight) {
          const pageResults = this.searchResults.find(r => r.pageNumber === pageNumber);
          if (pageResults) {
            await this.highlightMatches(page, pageResults.items, canvas);
          }
        }
      } catch (error) {
        console.error(`渲染第 ${pageNumber} 页失败:`, error);
      }
    },

    calculateScale(page) {
      const defaultViewport = page.getViewport({ scale: 1.0 });
      const containerWidth = document.querySelector('.box')?.clientWidth || window.innerWidth;
      return (containerWidth * 0.9) / defaultViewport.width;
    },

    adjustCanvasSize(canvas, viewport) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    },

    handleSearchInput() {
      if (!this.searchText.trim()) {
        this.clearHighlights();
      } else {
        clearTimeout(this.searchDebounce);
        this.searchDebounce = setTimeout(() => {
          this.searchPdf();
        }, 500);
      }
    },

    async searchPdf() {
      if (!this.pdfDoc || !this.searchText.trim()) {
        this.clearHighlights();
        return;
      }

      this.isSearching = true;
      this.searchResults = [];
      this.totalMatches = 0;

      try {
        const searchStr = this.searchText.toLowerCase();
        const pagesToSearch = this.pages.slice(0, this.maxSearchPages);

        for (const pageNumber of pagesToSearch) {
          const page = await this.pdfDoc.getPage(pageNumber);
          const textContent = await page.getTextContent();

          // 改进的文本匹配 - 合并所有文本块
          const fullText = textContent.items.map(item => item.str).join(' ');
          if (fullText.toLowerCase().includes(searchStr)) {
            const matchingItems = textContent.items.filter(item =>
              item.str.toLowerCase().includes(searchStr)
            );

            if (matchingItems.length > 0) {
              this.searchResults.push({
                pageNumber,
                items: matchingItems,
                fullText: fullText
              });
              this.totalMatches += matchingItems.length;
              await this.highlightMatches(page, matchingItems);
            }
          } else {
            await this.renderPage(pageNumber, true);
          }
        }

        if (this.totalMatches === 0) {
          console.log('未找到匹配内容');
        }
      } catch (error) {
        console.error('搜索失败:', error);
      } finally {
        this.isSearching = false;
      }
    },

    async highlightMatches(page, matches, targetCanvas = null) {
      const canvasId = `the-canvas${page.pageNumber}`;
      const canvas = targetCanvas || document.getElementById(canvasId);
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: this.calculateScale(page) });
      const defaultViewport = page.getViewport({ scale: 1.0 });

      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
      ctx.strokeStyle = 'rgba(255, 200, 0, 0.8)';
      ctx.lineWidth = 1;

      for (const item of matches) {
        const transform = item.transform;
        const x = transform[4];
        const y = transform[5];
        const width = item.width;
        const height = item.height;

        // 精确的坐标转换
        const scaleX = viewport.width / defaultViewport.width;
        const scaleY = viewport.height / defaultViewport.height;

        const canvasX = x * scaleX;
        const canvasY = viewport.height - (y * scaleY) - (height * scaleY);

        ctx.beginPath();
        ctx.rect(canvasX, canvasY, width * scaleX, height * scaleY);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    },

    clearHighlights() {
      this.searchResults = [];
      this.totalMatches = 0;
      this.renderAllPages();
    }
  },
  beforeUnmount() {
    this.isDestroyed = true;
    clearTimeout(this.searchDebounce);
  }
}
</script>

<style scoped>
.view-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-bar {
  padding: 12px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-bar button {
  padding: 8px 16px;
  background: #4a6baf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  min-width: 80px;
}

.search-bar button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.search-bar button:hover:not(:disabled) {
  background: #3a5a9f;
}

.search-count {
  font-size: 13px;
  color: #666;
  margin-left: 10px;
}

.search-status {
  font-size: 13px;
  color: #4a6baf;
  margin-left: 10px;
}

.box {
  flex: 1;
  overflow-y: auto;
  background: #525659;
}

.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

canvas {
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  background: white;
}
</style>
