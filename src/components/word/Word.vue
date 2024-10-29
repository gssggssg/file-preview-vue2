<template>
  <div id="file-preview-vue2-docx" style="height: 100%; margin: 0; padding: 0"></div>
</template>

<script>
import jsPreviewDocx from "@js-preview/docx";
import '@js-preview/docx/lib/index.css'
import jsPreviewExcel from "@js-preview/excel";

export default {
  components: {},
  props: {
    docx: {
      type: String,
      default:
        "http://qncdn.qkongtao.cn/lib/teamadmin/files/Hadoop2.7.1%E4%BC%AA%E5%88%86%E5%B8%83%E5%BC%8F%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%E6%96%87%E6%A1%A3.docx", //设置文档网络地址，可以是相对地址
    },
  },
  data() {
    return {
      myDocxPreviewer: null
    }
  },
  watch: {
    docx: {
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
        const dom = document.getElementById('file-preview-vue2-docx')
        if (dom) {
          const myDocxPreviewer = jsPreviewDocx.init(dom);
          myDocxPreviewer.preview(fileUrl).then(res => {
            console.log('预览完成', res);
          }).catch(e => {
            console.log('预览失败', e);
          })
        }
      })
    }
  }
};
</script>
