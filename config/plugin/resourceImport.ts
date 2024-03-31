/**
 * 资源引入：param-icon等
 */

/**
 * 转换 index.html 中的标记
 * @param isDevelopment 是否是本地开发环境
 * @param useComponent 是否使用插件存储库地址
 *   ? true => 使用: 相关第三方资源 param3d、param-icon 将会从插件存储库中下载
 *   : false => 否, 相关资源通过 npm 包下载(需要手动下载param3d、 param-icon, 并设置 package.json 中 "dev": "npm run width-file-server")
 * @returns
 */const transformHtml = (isDevelopment: boolean) => {
  return {
    name: "transform-html",
    transformIndexHtml(html) {
      return html.replace(
        /{{ dependencies }}/,
        isDevelopment
          ? `
            <link rel="stylesheet" href="/component/param-icon@1.0.3/font.css">
          `
          : `
            <link rel="stylesheet" href="/component/param-icon@1.0.3/font.css">
          `
      )
    }
  }
}
// <script src="/component/param3d@0.6.196/engine.js"></script>
// <script src="/component/param3dengineplugins%401.0.0/enginePlugin.js"></script> 
export default function resourceImportPlugin(isDevelopment: boolean) {
  return  transformHtml(isDevelopment)
}
