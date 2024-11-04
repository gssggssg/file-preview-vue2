<template>
  <div>
    <div id="myPlayer"></div>
  </div>
</template>

<script>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import Danmu from 'xgplayer/es/plugins/danmu'
import 'xgplayer/es/plugins/danmu/index.css'
export default {
  props: {
    // 组件需要的参数
    video: Object,
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.initXgplayer()
  },
  methods: {
    initXgplayer() {
      const config = {
        // 播放器ID
        id: 'myPlayer',
        width: '800px',
        height: '500px',
        // 视频链接
        url: this.video.src,
        playsinline: true,
        // 自动播放
        autoplay: false,
        // 视频封面链接
        poster: this.video.poster,
        // 播放器插件
        plugins: [Danmu],
        // 流式布局
        fluid: true,
        // 初始音量
        volume: 1,
        // 倍数配置
        playbackRate: [0.5, 1, 1.5, 2],
        // 缩略图集
        thumbnail: {
          pic_num: 44,
          width: 160,
          height: 90,
          col: 10,
          row: 10,
          urls: [this.video.thumbnailUrl],
        },
        // 显示下载按钮
        download: true,
        // 显示截图按钮
        screenShot: true,
        // 防止canvas toDataURL跨域画布污染
        videoAttributes: {
          crossOrigin: 'anonymous',
        },
        /** *********************  弹幕配置start ***********************/
        danmu: {
          // 预设弹幕内容
          comments: [
            {
              duration: 15000,
              id: '2',
              start: 3000,
              txt: '长弹幕长弹幕长弹幕',
              mode: 'top',
              style: {
                // 弹幕自定义样式
                color: '#ff9500', // 例：'#ff9500',
                'font-size': '30px', // 例：'20px',
                padding: '2px 11px', // 例： 2px 11px',
              },
            },
            {
              duration: 15000,
              id: '3',
              start: 4000,
              txt: '长弹幕长弹幕长弹幕',
              mode: 'bottom',
              style: {
                // 弹幕自定义样式
                color: '#ff9500', // 例：'#ff9500',
                'font-size': '40px', // 例：'20px',
                padding: '2px 11px', // 例： 2px 11px',
              },
            },
            {
              duration: 15000,
              id: '4',
              start: 5000,
              txt: '长弹幕长弹幕长弹幕',
              mode: 'scroll',
              style: {
                // 弹幕自定义样式
                color: '#de1c31', // 例：'#ff9500',
                'font-size': '48px', // 例：'20px',
                padding: '2px 11px', // 例： 2px 11px',
              },
            },
            {
              duration: 15000,
              id: '5',
              start: 8000,
              txt: '长弹幕长弹幕长弹幕',
              mode: 'scroll',
              style: {
                // 弹幕自定义样式
                color: '#813c85', // 例：'#ff9500',
                'font-size': '30px', // 例：'20px',
                padding: '2px 11px', // 例： 2px 11px',
              },
            },
          ],
          area: {
            start: 0,
            end: 1,
          },
          // 不使用默认提供弹幕开关
          closeDefaultBtn: false,
          // 关闭弹幕初始化
          defaultOff: true,
          // 弹幕控制面板
          panel: false,
        },
        /** *********************  弹幕配置end ***********************/
      }
      this.player = new Player(config)
    },
  },
}
</script>

<style>
</style>
