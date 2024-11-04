<template>
  <el-image
    :src="fileList[0]"
    :preview-src-list="fileList"
    :fit="'contain'"
  >
    <img alt :src="fileList[0]" slot="error"/>
  </el-image>
</template>

<script>
export default {
  props: {
    fileUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed:{
    fileList(){
      return this.fileUrl.split(',') || []
    }
  }
}
</script>

<style>
</style>
