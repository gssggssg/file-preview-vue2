<template>
  <div class="container-preview-file">
    <div  class="output" ref="output" v-if="!fileIdisNull">
      <Pdf :pdf="curFile.src" v-if="curFile.extend == 'pdf'"></Pdf>
      <Excel
        style="height: calc(100vh - 90px);"
        :excel="curFile.src"
        v-if="curFile.extend == 'xls' || curFile.extend == 'xlsx'"
      ></Excel>
      <Word
        :docx="curFile.src"
        v-if="curFile.extend == 'docx'"
      ></Word>
      <pptx
        :file="curFile.src"
        v-if="curFile.extend == 'ppt' || curFile.extend == 'pptx'"
      ></pptx>
      <MyVideo
        style=" margin: 100px auto;width: 900px; height: 600px;"
        :video="curFile.src"
        v-if="videoTypes.includes(curFile.extend)"
      ></MyVideo>
      <Music
        :musicList="[curFile.src]"
        v-if="musicTypes.includes(curFile.extend)"
      ></Music>
      <MyImage :src="curFile.src" v-if="imageTypes.includes(curFile.extend)"></MyImage>
      <Codemirror
        v-if="textTypes.includes(curFile.extend)"
        style="top: 130px;"
        :initCodeValue="curFile.src"
        :initEditorMode="curFile.extend"
      ></Codemirror>
      <div v-if="curFile.extend == undefined" class="desc">
        <!-- <p>
          不支持{{ extend }}格式的在线预览，请下载后预览或转换为支持的格式
        </p> -->
        <p>
          {{ remindInfo }}
        </p>
      </div>
    </div>
    <div class="output" v-else>
      请检查文件编码是否为空
    </div>
  </div>
</template>

<script>
import Codemirror from './components/codemirror/index.vue'
import Excel from './components/excel/Excel.vue'
import MyVideo from './components/mp4/Xgplayer.vue'
import Music from './components/music/Music.vue'
import Pdf from './components/pdf/Pdf.vue'
import pptx from './components/pptx/pptx.vue'
import Word from './components/word/Word.vue'
import MyImage from './components/image/Image.vue'
import 'codemirror/lib/codemirror.css'
export default {
  name: 'PreviewFile',
  components: {
    Codemirror,
    Excel,
    Music,
    MyVideo,
    Pdf,
    pptx,
    Word,
    MyImage,
  },
  props: {
    file: {
      type: Object,
      default() {
        return {
          fileId: null,
          suffix: null,
          originalName: null,
        }
      },
    },
    remindInfo: {
      type: String,
      default: '支持docx, xlsx, pdf的在线预览',
    },
  },
  data() {
    return {
      // 加载状态跟踪
      loading: false,
      // 文件拓展名
      extend: '',
      curFile: {},
      filename: '',
      fileIdisNull: false,
      imageTypes: ['gif', 'jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'png', 'svg'],
      videoTypes: ['avi', 'mpg', 'mpe', 'mpeg', 'asf', 'wmv', 'mov', 'qt',
        'rm', 'mp4', 'flv', 'm4v', 'webm', 'ogv', 'ogg'],
      musicTypes: ['mp3', 'wav', 'wma', 'mpa', 'ram', 'ra', 'aac', 'aif', 'm4a'],
      textTypes: ['txt', 'json', 'java', 'sql', 'js', 'css', 'xml', 'html', 'yaml', 'md', 'py'],
    }
  },
  watch: {
    file: {
      immediate: true,
      deep: true,
      handler(value) {
        const { fileUrl, suffix, originalName } = value
        if(!fileUrl) {
          return
        }
        this.curFile = {
          extend: suffix,
          src: fileUrl,
        }
        this.filename = originalName
      },
    },
  },
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
