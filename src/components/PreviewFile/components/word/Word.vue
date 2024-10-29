<template>
  <div>
    <vue-office-docx
      :src="docx"
      style=" margin: 0; padding: 0;height: 100%;"
      @rendered="rendered"
    />
  </div>
</template>

<script>
// 引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
// 引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
  components: {
    VueOfficeDocx,
  },
  props: {
    docx: {
      type: String,
      default:
        'http://qncdn.qkongtao.cn/lib/teamadmin/files/Hadoop2.7.1%E4%BC%AA%E5%88%86%E5%B8%83%E5%BC%8F%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85%E6%96%87%E6%A1%A3.docx', // 设置文档网络地址，可以是相对地址
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
