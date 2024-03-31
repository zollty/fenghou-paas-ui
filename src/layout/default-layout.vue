<template>
  <a-layout
    class="layout"
    :class="{ mobile: appStore.hideMenu }"
  >
    <div
      v-show="navbar"
      class="layout-navbar"
    >
      <NavBar :is-frame="isFrame" />
    </div>
    <iframe
      v-if="isFrame"
      id="sys-iframe"
      ref="frameRef"
      class="iframe"
      :src="system.iframeUrl"
      frameborder="0"
      @load="loadIframe"
    ></iframe>
    <a-layout v-else>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu && !isHideMenu"
          v-show="!hideMenu"
          class="layout-sider arco-theme"
          arco-theme="dark"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-drawer
          v-show="hideMenu && !isHideMenu"
          :visible="drawerVisible"
          placement="left"
          :footer="false"
          mask-closable
          :closable="false"
          @cancel="drawerCancel"
        >
          <Menu />
        </a-drawer>
        <a-layout
          class="layout-content"
          :style="paddingStyle"
        >
          <TabBar v-if="thisTabBar && !isHideMenu" />
          <a-layout-content class="layout-content-page">
            <slot>
              <PageLayout />
            </slot>
          </a-layout-content>
          <Footer v-if="footer" />
        </a-layout>
      </a-layout>
    </a-layout>
    <component
      :is="system.initComponent"
      v-if="system && system.initComponent && init"
    ></component>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch, provide, onMounted, nextTick } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useAppStore, useUserStore } from "@/store"
import NavBar from "@/components/navbar/index.vue"
import Menu from "@/components/menu/index.vue"
import Footer from "@/components/footer/index.vue"
import TabBar from "@/components/tab-bar/index.vue"
import usePermission from "@/hooks/permission"
import useResponsive from "@/hooks/responsive"
import PageLayout from "./page-layout.vue"
import { useMenuStore } from "@/store"
const props = defineProps({
  isHideMenu: {
    type: Boolean,
    default: false
  }
})
const useMenu = useMenuStore()
const appStore = useAppStore()
const system = computed(() => useMenu.$state.currentSystem)
const init = ref(false)
const isFrame = computed(() => {
  if (
    system.value &&
    system.value.iframeUrl &&
    route.meta.system &&
    system.value.defaultRoutePath === route.path
  )
    return true
  return false
})
const frameRef = ref()

/**跳转路由的方法 */
const jumpRouter = (path: string) => {
  router.push("/" + system.value.key + path)
}
provide("jumpRouter", jumpRouter)
//iframe通信方法
const loadIframe = () => {
  if (!frameRef.value) return
  let timer = null
  const frame = frameRef.value as HTMLIFrameElement
  frame.contentWindow.postMessage("isIframe", "*")
  let errorCount = 0
  const errorSize = 8
  timer = setInterval(() => {
    try {
      frame.contentWindow.postMessage("isIframe", "*")
    } catch (error) {
      console.error(error)
      errorCount++
      if (errorCount === errorSize) {
        clearInterval(timer)
      }
    }
  }, 1000)
  window.onmessage = function (e) {
    if (e.data && e.data == "end" && timer) {
      clearInterval(timer)
      /**发送主题 */
      frame.contentWindow.postMessage(appStore.theme, "*")
    }
  }
}
//监听主题变化发送给iframe
watch(
  () => appStore.theme,
  (val) => {
    if (!frameRef.value) return
    const frame = frameRef.value as HTMLIFrameElement
    frame.contentWindow.postMessage(val, "*")
  }
)

onMounted(() => {
  nextTick(() => {
    init.value = true
  })
})
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const permission = usePermission()
useResponsive(true)
const navbarHeight = "60px"
const navbar = computed(() => appStore.navbar)
const renderMenu = computed(() => appStore.menu)
const hideMenu = computed(() => appStore.hideMenu)
const footer = computed(() => appStore.footer)
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth
})
const thisTabBar = computed(() => {
  if (route.meta.tabBar) {
    return true
  }
  return appStore.tabBar
})
const collapsed = computed(() => {
  return appStore.menuCollapse
})
const paddingStyle = computed(() => {
  const paddingLeft =
    renderMenu.value && !hideMenu.value && !props.isHideMenu
      ? { paddingLeft: `${menuWidth.value}px` }
      : {}
  const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {}
  return { ...paddingLeft, ...paddingTop }
})
const setCollapsed = (val: boolean) => {
  appStore.updateSettings({ menuCollapse: val })
}

watch(
  () => userStore.userInfo.roles,
  (roleValue) => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: "notFound" })
  }
)
const drawerVisible = ref(false)
const drawerCancel = () => {
  drawerVisible.value = false
}
provide("toggleDrawerMenu", () => {
  drawerVisible.value = !drawerVisible.value
})
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: "";
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

:deep(.arco-menu-item.arco-menu-selected .arco-menu-selected-label) {
  right: 4px;
}

:deep(.arco-menu-light .arco-menu-item.arco-menu-selected) {
  background-color: rgb(255 255 255 / 8%);
  color: #eee;
}

:deep(.arco-menu-light .arco-menu-inline-header.arco-menu-selected) {
  background-color: var(--color-fill-2);
  color: #fff;
}

.iframe {
  width: 100%;
  margin-top: @nav-size-height;
  min-height: calc(100vh - @nav-size-height);
}
.layout-content {
  min-height: calc(100vh - @nav-size-height);
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
.layout-content-page {
  padding: 10px;
}
</style>
