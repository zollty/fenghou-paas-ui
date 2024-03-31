import type { RouteRecordNormalized } from "vue-router"
import { getCurrentSystemList } from "../system"
import { cloneDeep } from "lodash"
import { DEFAULT_LAYOUT } from "./base"
interface MyRouteRecordNormalized extends RouteRecordNormalized {
  system?: string[]
  children: any
  component?: any
}
/**内部路由 */
export const modules = import.meta.glob("./modules/*.ts", { eager: true })
/**外链 */
export const externalModules = import.meta.glob("./externalModules/*.ts", {
  eager: true
})
export const packages = import.meta.glob("packages/*/config.ts", {
  eager: true
})
/**独立路由 */
export const standalone = import.meta.glob("./standalone/*.ts", { eager: true })
/**处理Route的内容 */
export function formatRoute(
  route: MyRouteRecordNormalized,
  basePath: string,
  key: string,
  isExternal = false
) {
  const newRoute = cloneDeep(route)
  if (!isExternal) {
    newRoute.path =
      basePath +
      (newRoute.path.indexOf("/") === 0 ? newRoute.path : "/" + newRoute.path)
  }
  if (newRoute.component && !newRoute.meta.componentName) {
    newRoute.meta.componentName = newRoute.name as string
  }
  newRoute.name = key + "/" + (newRoute.name as string)
  newRoute.meta.system = key

  newRoute.children = formatChild(newRoute, newRoute.path, key)
  return newRoute
}
/**处理子路由 */
export function formatChild(
  route: MyRouteRecordNormalized,
  path: string,
  key: string,
  isExternal?: boolean
) {
  const result: MyRouteRecordNormalized[] = []
  if (route.children && route.children.length > 0) {
    route.children.forEach((nitem: any) => {
      const item = nitem as MyRouteRecordNormalized
      if (!item.system || item.system.includes(key)) {
        result.push(formatRoute(item, path, key, isExternal))
      }
    })
  }
  return result.length > 0 ? result : undefined
}
/**处理路由 */
function formatModules(
  _modules: any,
  result: MyRouteRecordNormalized[],
  isExternal?: boolean
) {
  const systemList = getCurrentSystemList()
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    result.push(...moduleList)
  })
  const allResult: RouteRecordNormalized[] | any = []

  /**通过systemList处理所有的路由，分类到各个系统，path前缀加上system的key */
  systemList.forEach((system) => {
    /**如果系统是iframe */
    if (system.iframeUrl) {
      allResult.push({
        path: system.defaultRoutePath,
        name: system.defaultName,
        component: DEFAULT_LAYOUT,
        system: [system.key],
        meta: {
          system: system.key
        }
      })
      //return
    }
    result.forEach((route) => {
      //不存在system则是所有页面通用的，包含就加入
      if (!route.system || route.system.includes(system.key)) {
        allResult.push(
          formatRoute(route, "/" + system.key, system.key, isExternal)
        )
      }
    })
  })
  Object.keys(standalone).forEach((key) => {
    const defaultModule = (standalone as any)[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    allResult.push(...moduleList)
    console.log(allResult)
  })
  return allResult
}
export function getPackageRoute(_modules: any, isExternal?: boolean) {
  const result = []
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].routes
    if (!defaultModule) return
    const m = isExternal ? defaultModule.externalModules : defaultModule.modules
    const moduleList = Array.isArray(m) ? [...m] : [m]
    result.push(...moduleList)
  })
  return result
}
export function getPackage(isExternal?: boolean) {
  return getPackageRoute(packages, isExternal)
}
export const appRoutes: RouteRecordNormalized[] = formatModules(
  modules,
  getPackageRoute(packages)
)

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  getPackageRoute(packages, true),
  true
)
