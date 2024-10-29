<template>
  <div>
    <div class="video">
      <Bililiplayer :video="video"></Bililiplayer>
    </div>
  </div>
</template>

<script>
import Aliplayer from './Aliplayer.vue'
import Xgplayer from './Xgplayer.vue'
import Bililiplayer from './Bilibiliplayer.vue'
export default {
  data() {
    return {
      video: {
        poster:
          'https://upyun.qkongtao.cn/others/video/%E8%8D%89%E5%B8%BD%E4%B8%80%E4%BC%99%E6%82%AC%E8%B5%8F%E4%BB%A4%E4%BC%A0%E9%81%8D%E5%85%A8%E4%B8%96%E7%95%8C.mp4.jpg',
        thumbnailUrl:
          'https://upyun.qkongtao.cn/others/video/%E8%8D%89%E5%B8%BD%E4%B8%80%E4%BC%99%E6%82%AC%E8%B5%8F%E4%BB%A4%E4%BC%A0%E9%81%8D%E5%85%A8%E4%B8%96%E7%95%8C.mp4.vtx',
        src: 'https://upyun.qkongtao.cn/AList/%E8%8D%89%E5%B8%BD%E4%B8%80%E4%BC%99%E6%82%AC%E8%B5%8F%E4%BB%A4%E4%BC%A0%E9%81%8D%E5%85%A8%E4%B8%96%E7%95%8C.mp4',
      },
    }
  },
  components: {
    Aliplayer,
    Xgplayer,
    Bililiplayer,
  },
}
</script>

<style scoped>
.video {
  margin: 100px auto;
  width: 800px;
  height: 500px;
}
</style>
