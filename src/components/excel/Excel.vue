<template>
  <vue-office-excel
    :src="excel"
    @rendered="renderedHandler"
    @error="errorHandler"
    style="height: calc(100vh - 90px);"
  />
</template>

<script>
// 引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
// 引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
  components: {
    VueOfficeExcel,
  },
  props: {
    excel: {
      type: String,
      default:
        'http://qncdn.qkongtao.cn/lib/teamadmin/files/2021%E5%B1%8A%E5%85%A8%E5%9B%BD%E5%90%84%E5%9C%B0%E6%B4%BE%E9%81%A3%E5%9C%B0%E5%9D%80.xlsx', // 设置文档地址
    },
  },
  data() {
    return {}
  },
  methods: {
    renderedHandler() {
      console.log('渲染完成')
    },
    errorHandler() {
      console.log('渲染失败')
    },
  },
}
</script>
