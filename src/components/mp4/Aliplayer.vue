<template>
  <!--播放器-->
  <div
    class="prism-player"
    id="J_prismPlayer"
    style="margin-left: auto; margin-right: auto;"
  ></div>
</template>
<script>
export default {
  props: {
    // 组件需要的参数
    video: Object,
  },
  data() {
    return {}
  },
  created() {
    // console.log("组件成功")
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      // console.log(this.video)
      var player = new Aliplayer(
        {
          id: 'J_prismPlayer', // id选择器
          source: this.video.src, // 视频地址
          width: '800px',
          height: '600px',
          // cover: 'http://images.qkongtao.cn/images/2021/08/15/t012cde4a5058c156b7.jpg', // 封面
          qualitySort: 'asc', // 清晰度排序
          mediaType: 'video', // 返回音频还是视频
          autoplay: false, // 自动播放
          isLive: false, // 直播
          rePlay: false, // 循环播
          preload: true,
          controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
          useH5Prism: true, // 播放器类型：html5
          thumbnailUrl: this.video.thumbnailUrl,
          // 允许匿名跨域访问属性
          extraInfo: {
            crossOrigin: 'anonymous',
          },
          skinLayout: [
            { name: 'bigPlayButton', align: 'blabs', x: 30, y: 80 },
            { name: 'H5Loading', align: 'cc' },
            { name: 'errorDisplay', align: 'tlabs', x: 0, y: 0 },
            { name: 'infoDisplay' },
            { name: 'tooltip', align: 'blabs', x: 0, y: 56 },
            { name: 'thumbnail' },
            {
              name: 'controlBar',
              align: 'blabs',
              x: 0,
              y: 0,
              children: [
                { name: 'progress', align: 'blabs', x: 0, y: 44 },
                { name: 'playButton', align: 'tl', x: 15, y: 12 },
                { name: 'timeDisplay', align: 'tl', x: 10, y: 7 },
                { name: 'fullScreenButton', align: 'tr', x: 10, y: 12 },
                // { name: "subtitle", align: "tr", x: 15, y: 12 },
                // { name: "setting", align: "tr", x: 15, y: 12 },
                { name: 'volume', align: 'tr', x: 5, y: 10 },
                { name: 'snapshot', align: 'tr', x: 5, y: 9 },
              ],
            },
          ],
        },
        function (player) {
          console.log('播放器创建成功')
        },
      )
      // 绑定鼠标事件（暂停、播放）
      var _video = document.querySelector('video')
      _video.addEventListener('click', play)
      player.on('play', function (e) {
        _video.removeEventListener('click', play)
        _video.addEventListener('click', pause)
      })
      player.on('pause', function (e) {
        _video.removeEventListener('click', pause)
        _video.addEventListener('click', play)
      })
      function play() {
        if (player) player.play()
        document.getElementsByClassName('prism-big-play-btn')[0].style.display =
          'none'
      }

      function pause() {
        if (player) player.pause()
        document.getElementsByClassName('prism-big-play-btn')[0].style.display =
          'block'
      }

      /* h5截图按钮, 截图成功回调 */
      player.on('snapshoted', function (data) {
        var pictureData = data.paramData.base64
        var downloadElement = document.createElement('a')
        downloadElement.setAttribute('href', pictureData)
        var fileName = 'Aliplayer' + Date.now() + '.png'
        downloadElement.setAttribute('download', fileName)
        downloadElement.click()
        pictureData = null
      })
    },
  },
}
</script>

<style scoped>
.prism-player {
  margin: 0;
  padding: 0;
}
