<template>
  <vue-office-pdf :src="pdf" @rendered="rendered" />
</template>

<script>
// 引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'

export default {
  components: {
    VueOfficePdf,
  },
  props: {
    pdf: {
      type: String,
      default:
        'http://qncdn.qkongtao.cn/lib/teamadmin/files/%E6%B7%B1%E5%9C%B3-xx-Java%E9%AB%98%E7%BA%A7.pdf',
    },
  },
  data() {
    return {}
  },
  methods: {
    rendered() {
      console.log('渲染完成')
    },
  },
}
</script>
