import { App } from 'vue'
import permission from './permission'
import clipboard from './clipboard'
import draggable from './draggable'
import debounce from './debounce'
import throttle from './throttle'

export default {
  install(Vue: App) {
    Vue.directive('permission', permission)
    /**
     * 拖拽指令 v-draggable="options"
     * options = {
     *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
     *  body:    /这里传入需要移动容器的CSS选择器/,
     *  recover: /拖动结束之后是否恢复到原来的位置/
     * }
     */
    Vue.directive('draggable', draggable)
    /**
     * clipboard指令 v-draggable="options"
     * options = {
     *  value:    /在输入框中使用v-model绑定的值/,
     *  success:  /复制成功后的回调/,
     *  error:    /复制失败后的回调/
     * }
     */
    Vue.directive('clipboard', clipboard)
    /**
     * 防抖指令 v-debounce="function"
     * function => 点击事件处理函数
     */
    Vue.directive('debounce', debounce)
    /**
     * 节流指令 v-throttle="function"
     * function => 点击事件处理函数
     */
    Vue.directive('throttle', throttle)
  }
}
