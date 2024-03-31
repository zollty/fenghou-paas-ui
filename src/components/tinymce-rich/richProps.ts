export const baseRichProps = {
  id: {
    type: String,
    default: function () {
      // 这个id一定要写，否则会出现莫名其妙的问题。
      return 'tinymce-' + Date.now() + Math.floor(Math.random() * 1000)
    }
  },
  // 内容
  modelValue: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 宽度
  width: {
    type: [String, Number],
    default: '100%'
  },
  // 高度
  height: {
    type: [String, Number],
    default: 450
  },
  // 是否允许拖动
  resize: {
    type: [String, Boolean],
    default: true
  },
  // 菜单栏
  menubar: {
    type: String,
    default: ''
  },
  // 工具栏
  toolbar: {
    type: String,
    default: ''
  },
  /**是否显示状态栏 */
  statusbar: {
    type: Boolean,
    default: false
  }
}
