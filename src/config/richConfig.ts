import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
// tinymce插件可按自己的需要进行导入
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/importcss' //图片工具
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/charmap' // 特殊字符
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/codesample' // 插入代码
import 'tinymce/plugins/code' // 查看源码
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/link' //
import 'tinymce/plugins/preview' // 预览
import 'tinymce/plugins/template' //插入模板
import 'tinymce/plugins/save' // 保存
import 'tinymce/plugins/searchreplace' //查询替换
import 'tinymce/plugins/pagebreak' //分页
import 'tinymce/plugins/insertdatetime' //时间插入
import 'tinymce/skins/content/default/content.css'
import { upload } from '@/api/createdApi'
import { RawEditorOptions } from 'tinymce'
import 'public/tinymce/langs/zh-Hans.js'
import 'public/tinymce/skins/ui/oxide/skin.min.css'
// 配置信息
// https://www.tiny.cloud/docs/configure/integration-and-setup/
const baseEditorOptions: RawEditorOptions = {
  /**
   * 语言路径
   */
  //language_url: "./tinymce/langs/zh-Hans.js",

  /**
   * 语言
   */
  language: 'zh-Hans',

  /**
   * 主题样式路径皮肤：这里引入的是public下的资源文件
   */
  //skin_url: "./tinymce/skins/ui/oxide",
  // skin_url: 'tinymce/skins/ui/oxide-dark',//黑色系
  /**
   * 文本样式路径
   */
  // content_css: "default",

  /**
   * 宽度
   */
  width: '100%',

  /**
   * 高度
   */
  height: 450,

  /**
   * 插件
   */
  plugins:
    'lists code pagebreak charmap save preview print image media link paste ' +
    'anchor codesample table wordcount fullscreen help searchreplace hr insertdatetime',

  /**
   * 菜单栏
   * file 文件
   * edit 编辑
   * view 视图
   * insert 插入
   * format 格式
   * tools 工具
   * table 表格
   * help 帮助
   */
  menubar: 'file edit view insert format tools table help',

  /**
   * 工具栏
   * https://www.tiny.cloud/docs/demo/full-featured/
   * | formatselect fontselect fontsizeselect | 段落、字体、字号
   * | undo redo | 撤销、重做
   * | code bold italic underline strikethrough | 源代码、粗体、斜体、下划线、删除线
   * | alignleft aligncenter alignright alignjustify | 左对齐、中间对齐、右对齐、两端对齐
   * | outdent indent numlist bullist insertdatetime | 减少缩进、增加缩进、编号列表、项目列表、时间日期
   * | table forecolor backcolor removeformat | 表格、文字颜色、背景色、清除格式
   * | hr searchreplace pagebreak charmap emoticons | 水平分割线、查找替换、分页符、特殊符号、表情
   * | fullscreen preview save print | 全屏、预览、保存、打印
   * | image media link anchor codesample | 上传文件、上传素材、插入链接、锚点、插入代码
   */
  toolbar:
    '| formatselect fontselect fontsizeselect ' +
    '| undo redo ' +
    '| code bold italic underline strikethrough ' +
    '| alignleft aligncenter alignright alignjustify ' +
    '| outdent indent numlist bullist insertdatetime ' +
    '| table forecolor backcolor removeformat ' +
    '| hr searchreplace pagebreak charmap ' +
    '| fullscreen preview save print ' +
    '| image media link anchor codesample ',

  /**
   * 工具栏展开方式
   */
  toolbar_mode: 'sliding',

  /**
   * 是否允许拖动
   * true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
   */
  resize: false,

  /**
   * 底部状态栏
   */
  statusbar: true,
  /**去掉upgtade */
  promotion: false,

  /**
   * 是否显示版权信息
   */
  branding: false,

  /**
   * 是否允许黏贴图片
   */
  paste_data_images: true,

  /**
   * 时间日期格式化
   */
  insertdatetime_formats: ['%H点%M分', '%Y年%m月%d日', '%Y年%m月%d日 %H点%M分', '%Y-%m-%d %H:%M'],

  // 默认使用base64格式
  images_upload_handler: blobInfo =>
    new Promise((resolve, reject) => {
      const maxSize = 2
      const blob = blobInfo.blob()

      if (blob.size / 1024 / 1024 > maxSize) {
        reject('图片大小不能超过' + maxSize + 'MB')
        return
      }

      const formData = new FormData()
      formData.append('file', blob, blobInfo.filename())

      upload(formData)
        .then(res => {
          if (res[1]) {
            resolve(res[1].data as string)
          } else {
            reject('文件上传失败，请重试')
          }
        })
        .catch(() => {
          reject('文件上传失败，请重试')
        })
    })
}
export default baseEditorOptions
