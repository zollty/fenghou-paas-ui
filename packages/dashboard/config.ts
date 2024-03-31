import { SystemList } from "#/interface"
import { getRoutesByModules } from "@/utils/util"
import InitVue from "./views/init.vue"
import platformImg from "../../public/platform-logo.png"
const key = "dashboard"
const systemConfig: SystemList = {
  name: "首页",
  key: key,
  /**icon自行替换 */
  icon: "param-icon-bns_all-menu",
  img:platformImg,
  initComponent: InitVue,
  /**默认路由名称自行替换 */
  defaultName: key + "/index",
  /**默认路由自行替换 */
  defaultRoutePath: "/" + key + "/index/kanban",
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
