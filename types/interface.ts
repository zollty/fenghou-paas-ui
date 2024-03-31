export interface SystemList {
  /**系统名称 */
  name: string
  /**系统标识 */
  key: string
  /**当前模块顶层组件，无关其他views页面，该组件会被挂载到layout上 */
  initComponent?: any
  /**图标 */
  icon?: string
  /**系统图片:如非外链,请放在public文件下*/
  img?: string
  /**系统图标:如非外链,请放在public文件下 */
  ico?: string
  /**iframe链接，存在此 */
  iframeUrl?: string
  /**系统默认路由名称 */
  defaultName: string
  /**系统默认路由,必须以 "/" 开头，如"/vue" */
  defaultRoutePath: string
  /**排序 */
  order?: number
}
