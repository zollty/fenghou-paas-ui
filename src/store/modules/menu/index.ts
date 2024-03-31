import { SystemList } from "#/interface"
import {
  externalModules,
  formatChild,
  getPackage,
  modules
} from "@/router/routes"
import { getCurrentSystemList } from "@/router/system"
import { cloneDeep } from "lodash"
import { defineStore } from "pinia"
import { RouteRecordNormalized } from "vue-router"
import { MenuState } from "./types"

function formatModules(
  _modules: any,
  packages: RouteRecordNormalized[],
  currentSystemKey: string,
  isExternal?: boolean
) {
  const result = []
  function push(moduleList) {
    const newModuleList = cloneDeep(moduleList)
      .filter((item) => {
        /**不存在则代表所有的 */
        if (!item.system) return true
        if (!currentSystemKey) return false
        if (item.system.includes(currentSystemKey)) return true
        return false
      })
      .map((item) => {
        if (isExternal) return item
        item.path = "/" + currentSystemKey + item.path
        item.name = currentSystemKey + "/" + (item.name as string)
        item.children = formatChild(
          item,
          item.path,
          currentSystemKey,
          isExternal
        )
        return item
      })
    result.push(...newModuleList)
  }
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    push(moduleList)
  })
  push(packages)
  return result
}
const list = getCurrentSystemList()
const useMenuStore = defineStore("menu", {
  state: (): MenuState => ({
    currentSystemKey: list[0].key,
    currentSystem: null
  }),
  getters: {
    // currentSystem(): SystemList | null {
    //   const cu = list.filter((item) => item.key === this.currentSystemKey)
    //   return cu.length > 0 ? cu[0] : null
    // },
    appMenuRoutes(): RouteRecordNormalized[] {
      return formatModules(modules, getPackage(), this.currentSystemKey)
    },
    appMenuExternalRoutes(): RouteRecordNormalized[] {
      return formatModules(
        externalModules,
        getPackage(true),
        this.currentSystemKey,
        true
      )
    }
  },
  actions: {
    setCurrentSystem(system: SystemList) {
      if (this.currentSystemKey === system?.key) return
      this.currentSystemKey = system?.key || ""
    },
    setCurrentSystemKey(key: MenuState["currentSystemKey"]) {
      this.currentSystemKey = key
      const cu = list.filter((item) => item.key === this.currentSystemKey)
      this.currentSystem = cu.length > 0 ? cu[0] : null
      return this.currentSystem
    }
  }
})
export default useMenuStore
