<template>
  <div ref="word" class="container-word"></div>
</template>

<script>
import jsPreviewDocx from "@js-preview/docx";
import '@js-preview/docx/lib/index.css'

export default {
  name: "Word",
  props: {
    fileUrl: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      myDocxPreviewer: null
    }
  },
  watch: {
    fileUrl: {
      deep: true,
      immediate: true,
      handler(value) {
        this.previewArea(value)
      }
    }
  },
  methods: {
    previewArea(fileUrl) {
      this.$nextTick(() => {
        const wordDom = this.$refs.word
        if (wordDom) {
          const myDocxPreviewer = jsPreviewDocx.init(wordDom);
          myDocxPreviewer.preview(fileUrl).then(res => {
            this.$emit('load','loadSuccess', res)
          }).catch(e => {
            this.$emit('load','loadFail', e)
          })
        }
      })
    }
  }
};
</script>

<style>
.container-word {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
