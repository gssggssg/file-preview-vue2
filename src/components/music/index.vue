<template>
  <div>
    <myaplayer class="aplayer" :musicList="musicList"></myaplayer>
  </div>
</template>

<script>
import myaplayer from './Music.vue'
export default {
  components: {
    myaplayer,
  },
  data() {
    return {
      musicList: [
        {
          name: '新时代',
          artist: 'Ado',
          url: 'https://upyun.qkongtao.cn/wordpress/files/%E6%96%B0%E6%97%B6%E4%BB%A3.mp3',
          cover:
            'https://qkongtao.cn/file/music/pic/%E6%96%B0%E6%97%B6%E4%BB%A3.png',
        },
        {
          name: '偏爱',
          artist: '张芸京',
          url: 'https://qkongtao.cn/file/music/%E5%81%8F%E7%88%B1-%E5%BC%A0%E8%8A%B8%E4%BA%AC.mp3',
          cover:
            'https://qkongtao.cn/file/music/pic/我们的爱我不放手-张芸京.jpg',
        },
        {
          name: '残酷月光',
          artist: '林宥嘉',
          url: 'https://qkongtao.cn/file/music/%E6%AE%8B%E9%85%B7%E6%9C%88%E5%85%89%20%E6%9E%97%E5%AE%A5%E5%98%89.mp3',
          cover:
            'https://qkongtao.cn/file/music/pic/%E6%AE%8B%E9%85%B7%E6%9C%88%E5%85%89.png',
        },
      ],
    }
  },
}
</script>

<style scoped>
.aplayer {
  margin: 120px auto;
  width: 800px;
}
</style>
