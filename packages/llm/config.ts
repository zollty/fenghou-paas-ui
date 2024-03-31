import { SystemList } from "#/interface"
import { getRoutesByModules } from "@/utils/util"
import InitVue from "./views/init.vue"
const key = "llm"
const systemConfig: SystemList = {
  name: "风后AI服务平台",
  key: key,
  /**icon自行替换 */
  icon: "param-icon-bns_Land-use-management",
  initComponent: InitVue,
  /**默认路由名称自行替换 */
  defaultName: key + "/svc/modelmg",
  /**默认路由自行替换 */
  defaultRoutePath: "/" + key + "/svc/modelmg",
  order: 4
}
export default systemConfig

/**内部路由 */
const modules = import.meta.glob("./router/modules/*.ts", { eager: true })
/**外链 */
const externalModules = import.meta.glob("./router/externalModules/*.ts", {
  eager: true
})

export const routes = {
  key,
  modules: getRoutesByModules(modules, key),
  externalModules: getRoutesByModules(externalModules, key)
}
