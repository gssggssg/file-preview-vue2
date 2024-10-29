<template>
  <div>
    <div id="aplayer" class="aplayer"></div>
  </div>
</template>

<script>
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'

export default {
  props: {
    musicList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      myAPlayer: null,
    }
  },
  mounted() {
    this.initAPlayer()
  },
  methods: {
    initAPlayer() {
      const options = {
        container: document.getElementById('aplayer'),
        theme: '#e9e9e9',
        audio: this.musicList,
      }
      const ap = new APlayer(options)
      this.myAPlayer = ap
    },
  },
}
</script>

<style scoped>
</style>
