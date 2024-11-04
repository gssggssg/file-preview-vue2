# file-preview-vue2

适用于Vue2的文件预览组件
支持`pdf`、`docx`、`xlsx`、`txt`、`json`等基本格式

## 安装

```bash
npm i file-preview-vue2
```

## 使用方法

- 引入

```javascript
import FilePreviewVue2 from "file-preview-vue2";
Vue.use(FilePreviewVue2);

// or 

import "file-preview-vue2/file-preview-vue2/file-preview-vue2.css";
import {Vue2FilePreview} from "file-preview-vue2";
```

- 使用

```vue
<!-- 无需import组件，直接全局使用即可。-->
<file-preview-vue2
  :file="currentFile"
/>
```

## API 配置项

### props

| 属性           | 类型     | 默认 | 说明                     |
|--------------|--------|----|------------------------|
| currentFile  | object | {} | ----                   |
| currentFile.fileUrl | string | ‘’ | 文件路径（可以是文件路径，也可以是下载路径） |
| currentFile.suffix | string | ‘’ | 文件后缀名                  |

### 事件

| 名称 | 说明     | 回调参数 |
| ---- |--------| -------- |
| loadSuccess | 文件加载成功 | -------- |
| loadFail | 文件加载失败 | -------- |
