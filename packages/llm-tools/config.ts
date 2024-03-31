import { SystemList } from "#/interface"
import { getRoutesByModules } from "@/utils/util"
import sysmgmtImg from "../../public/sysmgmt-logo.png"
import InitVue from "./views/init.vue"
const key = "llm-tools"
const systemConfig: SystemList = {
  name: "通用工具",
  key: key,
  img: sysmgmtImg,
  /**icon自行替换 */
  icon: "param-icon-bns_3d-section-cube2",
  initComponent: InitVue,
  /**默认路由名称自行替换 */
  defaultName: key + "/common/fileparse",
  /**默认路由自行替换 */
  defaultRoutePath: "/" + key + "/common/fileparse",
  order: 6
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
