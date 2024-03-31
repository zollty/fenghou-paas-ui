/**
 * 节流指令。防止按钮短时间内多次点击，
 * 第一次点击后禁用按钮，直到延迟结束再次放开。
 * 接收点击事件处理函数作为参数
 */
export default {
  mounted: (el, binding) => {
    if (typeof binding.value !== 'function') {
      throw new Error('throttle指令的参数必须是一个函数')
    }
    let timer: number | null = null
    el._handleClick = function () {
      if (timer) {
        window.clearTimeout(timer)
        timer = null
      }
      if (!el.disabled) {
        el.disabled = true
        timer = window.setTimeout(() => {
          el.disabled = false
        }, 1000)
        binding.value()
      }
    }
    el.addEventListener('click', el._handleClick)
  },
  beforeMounted: el => {
    el.removeEventListener('click', el._handleClick)
  }
}
