<template>
  <div id="app">
    <PreviewFile></PreviewFile>
  </div>
</template>

<script>
import PreviewFile from './components/PreviewFile/index.vue'

export default {
  name: 'PreviewFile',
  components: {
    PreviewFile,
  }
}
</script>

<style scoped>
.container-preview-file {
  width: 100%;
  height: 100vh;

  /* overflow: hidden; */
}

.content {
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 90px);
  background-color: #525659;
  color: #f2ffff;
}

.link-style {
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 30px;
  background-color: #525659;
  line-height: 30px;
  text-align: center;
  transform: translate(-50%);
}

.link-style a {
  text-decoration: none;
  color: #f2ffff;
}

.screenfull-style {
  margin-left: 10px;
  font-size: 25px;
}

.desc {
  margin: 200px auto;
  width: 600px;
  text-align: center;
  font-size: 18px;

  /* color: #f2ffff; */
}
</style>
