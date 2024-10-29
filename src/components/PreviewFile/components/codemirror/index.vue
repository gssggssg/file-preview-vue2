<template>
  <div class="code-mirror-div">
    <!-- <h2 style="text-align: center">代码编辑器</h2> -->
    <div class="tool-bar">
      <span>请选择主题:</span>
      <el-select
        v-model="cmTheme"
        placeholder="请选择"
        size="small"
        style=" margin-left: 10px;width: 150px;"
      >
        <el-option
          v-for="item in cmThemeOptions"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <span style="margin-left: 30px;">请选择编辑模式:</span>
      <el-select
        v-model="cmEditorMode"
        placeholder="请选择"
        size="small"
        style=" margin-left: 10px;width: 150px;"
        @change="onEditorModeChange"
      >
        <el-option
          v-for="item in cmEditorModeOptions"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <span style="margin-left: 30px;">字体大小:</span>
      <el-select
        v-model="cmEditorSize"
        placeholder="请选择"
        size="small"
        style=" margin-left: 10px;width: 150px;"
        @change="onEditorSizeChange"
      >
        <el-option
          v-for="item in cmEditorSizeOptions"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        size="small"
        style="margin-left: 30px;"
        @click="jsonFormatter"
        v-if="cmEditorMode == 'json'"
        >格式化json</el-button
      >
      <el-button
        type="primary"
        size="small"
        style="margin-left: 30px;"
        @click="jsonPress"
        v-if="cmEditorMode == 'json'"
        >压缩json</el-button
      >
    </div>
    <Codemirror
      ref="cmEditor"
      :cmTheme="cmTheme"
      :cmMode="cmMode"
      :autoFormatJson="autoFormatJson"
      :jsonIndentation="jsonIndentation"
      :value="codeValue"
      @onChangeCode="onChangeCode"
    ></Codemirror>
  </div>
</template>
<script>
import Codemirror from './Codemirror.vue'
export default {
  components: {
    Codemirror,
  },
  props: {
    initCodeValue: {
      type: String,
      default:
        `{"canvasStyleData":{"width":1280,"height":720,"scale":100,"color":"#000","opacity":1,
        "background":"#fff","fontSize":14,"backgroundColor":"rgba(232, 244, 200, 1)"}}`, // 代码
    },
    initEditorMode: {
      type: String,
      default: 'json', // 编辑模式
    },
  },
  data() {
    return {
      cmTheme: 'default', // codeMirror主题
      // codeMirror主题选项
      cmEditorSizeOptions: [
        '10',
        '12',
        '14',
        '16',
        '18',
        '20',
        '24',
        '28',
        '32',
      ],
      cmThemeOptions: [
        'default',
        'idea',
        '3024-day',
        '3024-night',
        'abcdef',
        'ambiance',
        'ayu-dark',
        'ayu-mirage',
        'base16-dark',
        'base16-light',
        'bespin',
        'blackboard',
        'cobalt',
        'colorforth',
        'darcula',
        'dracula',
        'duotone-dark',
        'duotone-light',
        'eclipse',
        'elegant',
        'erlang-dark',
        'gruvbox-dark',
        'hopscotch',
        'icecoder',
        'isotope',
        'lesser-dark',
        'liquibyte',
        'lucario',
        'material',
        'material-darker',
        'material-palenight',
        'material-ocean',
        'mbo',
        'mdn-like',
        'midnight',
        'monokai',
        'moxer',
        'neat',
        'neo',
        'night',
        'nord',
        'oceanic-next',
        'panda-syntax',
        'paraiso-dark',
        'paraiso-light',
        'pastel-on-dark',
        'railscasts',
        'rubyblue',
        'seti',
        'shadowfox',
        'solarized dark',
        'solarized light',
        'the-matrix',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'ttcn',
        'twilight',
        'vibrant-ink',
        'xq-dark',
        'xq-light',
        'yeti',
        'yonce',
        'zenburn',
      ],
      // 编辑模式选项
      cmEditorModeOptions: [
        'json',
        'java',
        'sql',
        'js',
        'css',
        'xml',
        'html',
        'yaml',
        'md',
        'py',
        'txt',
      ],
      cmEditorMode: this.initEditorMode, // 编辑模式
      cmMode: 'application/json', // codeMirror模式
      jsonIndentation: 2, // json编辑模式下，json格式化缩进 支持字符或数字，最大不超过10，默认缩进2个空格
      autoFormatJson: true, // json编辑模式下，输入框失去焦点时是否自动格式化，true 开启， false 关闭,
      cmEditorSize: '16',
      codeValue: this.initCodeValue,
    }
  },

  mounted() {
    this.onEditorModeChange(this.initEditorMode)
    var sd = document.getElementsByClassName('code-mirror')
    sd[0].style.fontSize = this.cmEditorSize + 'px'
  },
  methods: {
    // 切换编辑模式事件处理函数
    onEditorModeChange(value) {
      switch (value) {
        case 'json':
          this.cmMode = 'application/json'
          break
        case 'java':
          this.cmMode = 'text/x-java'
          break
        case 'sql':
          this.cmMode = 'sql'
          break
        case 'js':
          this.cmMode = 'javascript'
          break
        case 'xml':
          this.cmMode = 'xml'
          break
        case 'css':
          this.cmMode = 'css'
          break
        case 'html':
          this.cmMode = 'htmlmixed'
          break
        case 'yaml':
          this.cmMode = 'yaml'
          break
        case 'md':
          this.cmMode = 'markdown'
          break
        case 'txt':
          this.cmMode = 'markdown'
          break
        case 'py':
          this.cmMode = 'python'
          break
        default:
          this.cmMode = 'application/json'
      }
    },
    // 代码修改
    changeCode(value) {
      this.codeValue = value
    },
    // 选择字体大小
    onEditorSizeChange() {
      var sd = document.getElementsByClassName('code-mirror')
      sd[0].style.fontSize = this.cmEditorSize + 'px'
    },
    // 获取代码
    onChangeCode(code) {
      this.codeValue = code
    },
    // 格式化字符串为json格式字符串
    jsonFormatter() {
      try {
        this.codeValue = JSON.stringify(JSON.parse(this.codeValue), null, '\t')
      } catch {
        alert('json代码有误')
      }
    },
    // 压缩json
    jsonPress() {
      try {
        this.codeValue = JSON.stringify(JSON.parse(this.codeValue))
      } catch {
        alert('json代码有误')
      }
    },
  },
}
</script>
<style scope>
.code-mirror {
  position: absolute;
  inset: 0 5px 0 2px;
  margin-bottom: 50px;
  padding: 2px;
  height: calc(100vh - 170px);
}

.code-mirror-div {
  position: absolute;
  inset: 0 5px 0 2px;
  padding: 2px;
}

.tool-bar {
  margin: -50px 2px 0 20px;
}
</style>



