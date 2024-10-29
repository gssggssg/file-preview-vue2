<template>
  <div>
    <iframe
      :src="playerApi + src"
      allowfullscreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen"
      msallowfullscreen="msallowfullscreen"
      oallowfullscreen="oallowfullscreen"
      webkitallowfullscreen="webkitallowfullscreen"
      width="800px"
      height="500px"
      frameborder="0"
      style="player"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  props: {
    // 组件需要的参数
    video: Object,
  },

  data() {
    return {
      playerApi: 'http://code.qkongtao.cn/video/player/?url=',
      src: '',
    }
  },
  mounted() {
    this.src = this.video.src
  },
  methods: {},
}
</script>

<style scoped>
.player {
  margin-top: 30px;
}
</style>
