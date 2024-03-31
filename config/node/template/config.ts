import { SystemList } from "#/interface"
import { getRoutesByModules } from "@/utils/util"
import InitVue from "./views/init.vue"
const key = "{{name}}"
const systemConfig: SystemList = {
  name: "{{desc}}",
  key: key,
  /**icon自行替换 */
  icon: "IconApps",
  initComponent: InitVue,
  /**默认路由名称自行替换 */
  defaultName: key + "/test",
  /**默认路由自行替换 */
  defaultRoutePath: "/" + key + "/test/test",
  order: 1
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
