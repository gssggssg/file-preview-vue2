import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import VueCompositionAPI from '@vue/composition-api';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import 'codemirror/lib/codemirror.css'

Vue.use(ElementUI, { size: "small" });
Vue.use(ElementUI);
Vue.use(VueCompositionAPI);

new Vue({
  render: h => h(App),
}).$mount('#app')
