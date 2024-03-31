import { SystemList } from "#/interface"
import { envVar } from "@/config"
import { cloneDeep, isUndefined } from "lodash"
import toPt from "../inits/toPt.vue"
import sysmgmtImg from "../../public/sysmgmt-logo.png"
import resourceCenterImg from "../../public/resource-center-logo.png"
import { getAppHref } from "@/utils/url"
/**获取packages下的所有系统配置 */
export const modules = import.meta.glob("packages/*/config.ts", { eager: true })
const defaultSystemList: SystemList[] = [
  {
    name: "开发者文档",
    key: "docsys",
    icon: "param-icon-bns_management-asset",
    img: sysmgmtImg,
    defaultName: "docsys",
    //iframeUrl: getAppHref("sysmgmt", "app-sysmgmt"),
    iframeUrl: "https://shudi.yuque.com/ftc8lc/wiki",
    defaultRoutePath: "/docsys",
    order:200
  },
]
// [
//   {
//     name: "系统管理中心",
//     key: "sysmgmt",
//     icon: "param-icon-bns_backstage",
//     img: sysmgmtImg,
//     defaultName: "sysmgmt",
//     iframeUrl: getAppHref("sysmgmt", "app-sysmgmt"),
//     // iframeUrl: 'http://localhost:3005/#/app-manage/application-manage',
//     defaultRoutePath: "/sysmgmt",
//     order:11
//   },
//   {
//     name: "资源管理中心",
//     key: "resource-center",
//     icon: "param-icon-bns_management-asset",
//     img: resourceCenterImg,
//     defaultName: "resourceCenter",
//     iframeUrl: getAppHref("resourceCenter", "app-resource-center"),
//     // iframeUrl: 'http://localhost:3000/#/theme-database',
//     defaultRoutePath: "/resource-center",
//     // initComponent: toPt,
//     order:12
//   }
// ]
function insertPackages(_modules) {
  const newList = cloneDeep(defaultSystemList)
  Object.keys(modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    newList.push(...moduleList)
  })
  newList.sort((a, b) => {
    const aO = a.order
    const bO = b.order
    /**
     * 返回数字0:原顺序
     * 返回数字<0:a在b之前
     * 返回数字>0:a在b之后
     */
    if (isUndefined(aO) && isUndefined(bO)) return 0
    if (!isUndefined(aO) && isUndefined(bO)) return -1
    if (isUndefined(aO) && !isUndefined(bO)) return 1
    return aO - bO
  })
  return newList
}

export function getCurrentSystemList(): SystemList[] {
  const systemList = insertPackages(modules)

  if (envVar.VITE_SYSTEM_LIST === "*" || !envVar.VITE_SYSTEM_LIST)
    return systemList
  const list = envVar.VITE_SYSTEM_LIST.split(",")
  return systemList.filter((item) => list.includes(item.key))
}
