<script lang="tsx">
import { defineComponent, ref, h, compile, computed } from "vue"
import {
  useRoute,
  useRouter,
  RouteRecordRaw,
  RouteLocationNormalized,
  RouteRecordName
} from "vue-router"
import type { RouteMeta } from "vue-router"
import { useAppStore } from "@/store"
import { listenerRouteChange } from "@/utils/route-listener"
import { openWindow, regexUrl } from "@/utils"
import useMenuTree from "./use-menu-tree"
import MyIcon from "../my-icon/my-icon.vue"

export default defineComponent({
  emit: ["collapse", "menu-item-click", "sub-menu-click"],
  setup() {
    const appStore = useAppStore()
    const router = useRouter()
    const route = useRoute()
    const { menuTree } = useMenuTree()
    const collapsed = computed({
      get() {
        if (appStore.device === "desktop") return appStore.menuCollapse
        return false
      },
      set(value: boolean) {
        appStore.updateSettings({ menuCollapse: value })
      }
    })

    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])

    const goto = (item: RouteRecordRaw) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path)
        selectedKey.value = [item.name as string]
        return
      }
      // Eliminate external link side effects
      const { hideInMenu, activeMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string]
        return
      }
      // Trigger router change
      router.push({
        name: item.name
      })
    }
    const findMenuOpenKeysbyMatched = (
      route: RouteLocationNormalized
    ): string[] => {
      return route.matched
        .map((item) => (item.name as string) || "")
        .filter((item) => !!item)
    }
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }
    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        // const menuOpenKeys = findMenuOpenKeys(
        //   (activeMenu || newRoute.name) as string
        // );
        const menuOpenKeys = findMenuOpenKeysbyMatched(newRoute)
        const keySet = new Set([...menuOpenKeys, ...openKeys.value])
        openKeys.value = [...keySet]

        selectedKey.value = [
          activeMenu || menuOpenKeys[menuOpenKeys.length - 1]
        ]
      }
    }, true)
    const setCollapse = (val: boolean) => {
      if (appStore.device === "desktop")
        appStore.updateSettings({ menuCollapse: val })
    }
    const toggleCollapse = () => {
      if (appStore.device === "desktop")
        appStore.updateSettings({ menuCollapse: !appStore.menuCollapse })
    }
    // const whenMenuItemClick = () => {console.log("=====================")}
    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon
              ? () => h(MyIcon, { name: element?.meta?.icon })
              : null
            const node =
              element?.children && element?.children.length !== 0 ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => h(compile(element?.meta?.menuName || ""))
                  }}>
                  {travel(element?.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item
                  key={element?.name}
                  v-slots={{ icon }}
                  onClick={() => goto(element)}>
                  {element?.meta?.menuName || ""}
                </a-menu-item>
              )
            nodes.push(node as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }

    /* onMenuItemClick={whenMenuItemClick} */
    return () => (
      <>
        {/* <a-button onClick={toggleCollapse}></a-button> */}
        <a-menu
          v-model:collapsed={collapsed.value}
          v-model:open-keys={openKeys.value}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%"
          onCollapse={setCollapse}>
          {renderSubMenu()}
        </a-menu>
      </>
    )
  }
})
</script>

<style lang="less" scoped>
@keyframes activeAnimation {
  0% {
    background: rgba(var(--primary-6), 0);
    width: 0%;
  }
  50% {
    background: rgba(var(--primary-6), 0.6);
    width: 100%;
  }
  100% {
    background: rgba(var(--primary-6), 0);
    width: 100%;
    // background: var(--color-fill-2);
    // display: none;
  }
}
:deep(.arco-menu-inner) {
  .arco-menu-title {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .arco-menu-inline {
    border-bottom: 1px solid var(--color-border);
  }
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
:deep(.arco-menu-item.arco-menu-selected) {
  position: relative;
  &::before {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    width: 100%;
    height: 100%;
    animation: activeAnimation 0.8s;
  }
  border-left: 2px solid rgb(var(--primary-6));
}
</style>
