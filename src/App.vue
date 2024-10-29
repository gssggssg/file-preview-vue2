<template>
  <div id="app">
    <PreviewFile></PreviewFile>
  </div>
</template>

<script>
import PreviewFile from './components/PreviewFile/index.vue'

export default {
  name: 'App',
  components: {
    PreviewFile,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
