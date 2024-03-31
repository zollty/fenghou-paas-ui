import { IconSafe, IconDashboard } from "@arco-design/web-vue/es/icon"
import { getAppHref } from "@/utils/url"
import { openWindow } from "@/utils"

export interface Ilink {
  /**悬浮提示文字 */
  tooltip: string
  /**图标组件 */
  iconCom?: any
  /**图标类名，优先级低于图标组件 */
  iconClass?: string
  /**点击事件 */
  clickFn?: any
}
export const LinkList: Ilink[] = [
  // {
  //   tooltip: "跳转到服务管理中心",
  //   iconCom: IconSafe,
  //   clickFn: () => {
  //     const url = getAppHref("serviceCenter", "app-service-center")
  //     url && openWindow(url)
  //   }
  // },
  // {
  //   tooltip: "跳转到运维监控中心",
  //   iconCom: IconDashboard,
  //   clickFn: () => {
  //     const url = getAppHref("opsMonitor", "app-ops-monitor")
  //     url && openWindow(url)
  //   }
  // }
]
