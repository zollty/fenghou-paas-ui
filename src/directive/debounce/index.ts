/**
 * 防抖指令。快速点击元素时，只有最后一次生效
 * 接收点击事件处理函数作为参数
 */
export default {
  mounted: (el, binding) => {
    if (typeof binding.value !== 'function') {
      throw new Error('debounce指令的参数必须是一个函数')
    }
    let timer: number | null = null
    el._handleClick = function () {
      if (timer) {
        window.clearTimeout(timer)
        timer = null
      }
      timer = window.setTimeout(() => {
        binding.value()
      }, 500)
    }
    el.addEventListener('click', el._handleClick)
  },
  beforeUnmounted: el => {
    el.removeEventListener('click', el._handleClick)
  }
}
