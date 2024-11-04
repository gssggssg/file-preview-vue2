<template>
  <div class="container-preview-file">
    <component
      v-if="currentComponent"
      :is="currentComponent"
      :file-url="file.fileUrl || file.url"
      :file-suffix="file.suffix || file.fileSuffix"
      @load="loadFile"
    >
    </component>
    <div v-else class="content-support">
      <slot name="noSupport"></slot>
    </div>
  </div>
</template>

<script>
import Excel from "@/components/excel/Excel.vue"
import MyVideo from "@/components/mp4/Xgplayer.vue"
import Music from "@/components/music/Music.vue"
import Pdf from "@/components/pdf/Pdf.vue"
import pptx from "@/components/pptx/pptx.vue"
import Word from "@/components/word/Word.vue"
import MyImage from "@/components/image/Image.vue"
import Codemirror from "@/components/codemirror/index.vue"

// const Excel = () => import('./components/excel/Excel.vue')
// const MyVideo = () => import('./components/mp4/Xgplayer.vue')
// const Music = () => import('./components/music/Music.vue')
// const Pdf = () => import('./components/pdf/Pdf.vue')
// const pptx = () => import('./components/pptx/pptx.vue')
// const Word = () => import('./components/word/Word.vue')
// const MyImage = () => import('./components/image/Image.vue')
// const Codemirror = () => import('./components/codemirror/index.vue')

const FILE_TYPES = [
  [['pdf'], 'Pdf'],
  [['gif', 'jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'png', 'svg'], 'MyImage'],
  [['xls', 'xlsx'], 'Excel'],
  [['avi', 'mpg', 'mpe', 'mpeg', 'asf', 'wmv', 'mov', 'qt', 'rm', 'mp4', 'flv', 'm4v', 'webm', 'ogv', 'ogg'], 'MyVideo'],
  [['mp3', 'wav', 'wma', 'mpa', 'ram', 'ra', 'aac', 'aif', 'm4a'], 'Music'],
  [['ppt', 'pptx'], 'pptx'],
  [['docx', 'doc'], 'Word'],
  [['txt', 'json', 'java', 'sql', 'js', 'css', 'xml', 'html', 'yaml', 'md', 'py'], 'Codemirror'],
]

export default {
  name: 'FilePreviewVue2',
  components:{
    Pdf,MyImage,Excel,MyVideo,Music,pptx,Word,Codemirror
  },
  props: {
    file: {
      type: Object,
      default() {
        return {
          fileUrl: '',
          suffix: '',
        }
      },
    },
    remindInfo: {
      type: String,
      default: '支持docx, xlsx, pdf的在线预览',
    },
    config: {
      type: Object,
      default() {
        return {}
      },
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    currentComponent() {
      const {suffix} = this.file || {}
      const [_, component] = FILE_TYPES.find(([typeList]) => {
        return typeList.includes(suffix)
      }) || ['', '']
      if (component) {
        this.loading = true
      }
      return component
    }
  },
  methods: {
    loadFile(type, info) {
      this.$emit(type, info)
      this.loading = false
    },
  },
}
</script>

<style scoped>
.container-preview-file {
  position: relative;
  width: 100%;
  height: 100%;
}

.content-support {
  width: 100%;
  height: 100%;
}
</style>
