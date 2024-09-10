//import vue文件的name from 路径
import Vue2FilePreview from "./App.vue";

const components = [Vue2FilePreview];

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  components.forEach((component) => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// 暴露安装方法和组件
const Vue2FilePreviewPlugin = {
  install,
  Vue2FilePreview,
};

export default Vue2FilePreviewPlugin;
export { Vue2FilePreview };
