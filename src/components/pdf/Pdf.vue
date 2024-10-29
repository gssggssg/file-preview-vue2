<template>
  <div id="file-preview-vue2-pdf"></div>
</template>

<script>
import jsPreviewPdf from "@js-preview/pdf";

export default {
  components: {},
  props: {
    pdf: {
      type: String,
      default:
        'http://qncdn.qkongtao.cn/lib/teamadmin/files/%E6%B7%B1%E5%9C%B3-xx-Java%E9%AB%98%E7%BA%A7.pdf',
    },
  },
  data() {
    return {
      myDocxPreviewer: null
    }
  },
  watch: {
    pdf: {
      deep: true,
      immediate: true,
      handler(value) {
        this.previewArea(value)
      }
    }
  },
  methods: {
    previewArea(fileUrl) {
      this.$nextTick(() => {
        const dom = document.getElementById('file-preview-vue2-pdf')
        if(dom){
          const myPdfPreviewer = jsPreviewPdf.init(dom, {
            onError: (e) => {
              console.log('加载', e)
            },
            onRendered: () => {
              console.log('渲染完成')
            }
          });
          myPdfPreviewer.preview(fileUrl);
        }
      })
    }
  }
}
</script>
