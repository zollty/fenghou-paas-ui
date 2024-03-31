import type { RouteLocationNormalized } from "vue-router"
import { defineStore } from "pinia"
import { isString } from "@/utils/is"
import { TabBarState, TagProps } from "./types"
import { REDIRECT_ROUTE_NAME } from "@/router/constants"
import { useAppStore } from "@/store"

const getAppStore = () => useAppStore()
const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    title: meta.menuName || "",
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache
  }
}

const BAN_LIST = [REDIRECT_ROUTE_NAME]

const tabBarStore = defineStore("tabBar", {
  state: (): TabBarState => ({
    cacheTabList: new Set([]),
    tagList: []
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheList(): string[] {
      console.log("------------GET------------------")
      console.log(this.cacheTabList)
      return Array.from(this.cacheTabList)
    }
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      console.log("---------------------------222---", route.name, route.fullPath)
      console.log("-----------------------------23-", this.cacheTabList)
      if (!route.meta.tabBar && !getAppStore().tabBar) return
      if (BAN_LIST.includes(route.name as string)) return
      if(this.tagList.some((tag) => tag.fullPath === route.fullPath)) return
      this.tagList.push(formatTag(route))
      if (!route.meta.ignoreCache&&route.meta.componentName) {
        this.cacheTabList.add(route.meta.componentName)
      }
      console.log("-----------------------------23-", this.cacheTabList)
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(name: string) {
      if (isString(name) && name !== "") this.cacheTabList.add(name)
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter((el) => !el.ignoreCache)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = []
      this.cacheTabList.clear()
      // this.cacheTabList.add()
    }
  }
})

export default tabBarStore
