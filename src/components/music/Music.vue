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
    fileUrl: {
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
      if(!Array.isArray(this.fileUrl)){
        this.fileUrl = [this.fileUrl]
      }
      const options = {
        container: document.getElementById('aplayer'),
        theme: '#e9e9e9',
        audio: this.fileUrl,
      }
      const ap = new APlayer(options)
      this.myAPlayer = ap
    },
  },
}
</script>

<style>
</style>
