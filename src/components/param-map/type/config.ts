export interface IinitParams {
  /** 申请好的Web端开发者Key，首次调用 load 时必填 */
  key: string
  /**指定要加载的 JSAPI 的版本，默认为 2.0 */
  version: string
  /**插件列表 */
  plugins?: string[]
  /** 是否加载 AMapUI*/
  AMapUI?: {
    /**AMapUI 缺省 1.1 */
    version?: string
    /**需要加载的 AMapUI ui插件 */
    plugins?: string[]
  }
  // 是否加载 Loca， 缺省不加载
  Loca?: {
    version?: string // Loca 版本，缺省 1.3.2
  }
}