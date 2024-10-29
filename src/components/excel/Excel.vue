<template>
  <div id="file-preview-vue2-excel" style="height: calc(100vh - 90px);"></div>
</template>

<script>
import jsPreviewExcel from "@js-preview/excel";
import '@js-preview/excel/lib/index.css';

export default {
  components: {},
  props: {
    excel: {
      type: String,
      default:
        'http://qncdn.qkongtao.cn/lib/teamadmin/files/2021%E5%B1%8A%E5%85%A8%E5%9B%BD%E5%90%84%E5%9C%B0%E6%B4%BE%E9%81%A3%E5%9C%B0%E5%9D%80.xlsx', // 设置文档地址
    },
  },
  data() {
    return {
      myDocxPreviewer: null
    }
  },
  watch: {
    excel: {
      deep: true,
      immediate: true,
      handler(value) {
        this.previewArea(value)
      }
    }
  },
  mounted() {
  },
  methods: {
    previewArea(fileUrl) {
      this.$nextTick(() => {
        const dom = document.getElementById('file-preview-vue2-excel')
        if(dom){
          const myExcelPreviewer = jsPreviewExcel.init(dom);
          myExcelPreviewer.preview(fileUrl).then(res=>{
            console.log('预览完成');
          }).catch(e=>{
            console.log('预览失败', e);
          })
        }
      })
    }
  }
}
</script>
