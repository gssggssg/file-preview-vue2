<template>
  <div>
    <viewer>
      <img alt="图片" :src="src" class="image" />
    </viewer>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'http://upyun.qkongtao.cn/chevereto/2022/08/30/onepiece.png',
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.image {
  display: block;
  margin: 100px auto;
  width: auto;
  width: 600px;
}
</style>
