<template>
  <div ref="excel" class="container-excel"></div>
</template>

<script>
import jsPreviewExcel from "@js-preview/excel";
import '@js-preview/excel/lib/index.css';

export default {
  name: "Excel",
  props: {
    fileUrl: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      myDocxPreviewer: null
    }
  },
  watch: {
    fileUrl: {
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
        const excelDom = this.$refs.excel
        if(excelDom){
          const myExcelPreviewer = jsPreviewExcel.init(excelDom);
          myExcelPreviewer.preview(fileUrl).then(res=>{
            this.$emit('load','loadSuccess', res)
          }).catch(e => {
            this.$emit('load','loadFail', e)
          })
        }
      })
    }
  }
}
</script>

<style>
.container-excel {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
