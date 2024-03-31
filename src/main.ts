import { createApp } from "vue"
import ArcoVue from "@arco-design/web-vue"
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import globalComponents from "@/components"
import router from "./router"
import store from "./store"
import directive from "./directive"
import App from "./App.vue"
import "@arco-design/web-vue/dist/arco.less"
import "@/assets/style/global.less"
import "@/api/interceptor"
import tinymce from "tinymce/tinymce"
import Print from "vue3-print-nb"
window.tinymce = tinymce
import * as echarts from "echarts"
import darkTheme from "public/echarts/theme/my-dark.json"
/**注册echarts主题 */
function initEchartsTheme() {
  /**主题编辑https://echarts.apache.org/zh/theme-builder.html */
  echarts.registerTheme("my-dark", darkTheme)
}
initEchartsTheme()
const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(Print) //注册
app.use(router)
app.use(store)
app.use(globalComponents)
app.use(directive)

app.mount("#app")
