<template>
  <div
    class="navbar arco-theme"
    arco-theme="dark"
  >
    <div
      class="left-side"
      :style="{ width: width + 'px' }"
    >
      <a-space>
        <img
          v-if="titleIcoState.img"
          alt="logo"
          class="logo"
          :src="titleIcoState.img"
        />
        <a-typography-title
          v-if="appStore.device !== 'mobile'"
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          {{ titleIcoState.title }}
        </a-typography-title>
        <icon-menu-fold
          v-if="appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
      <a-button
        v-if="appStore.device !== 'mobile'&&!isFrame"
        size="mini"
        type="primary"
        @click="toggleCollapse"
      >
        <icon-menu-unfold v-if="appStore.menuCollapse" />
        <icon-menu-fold v-else />
      </a-button>
    </div>
    <NavbarMenu></NavbarMenu>
    <NavbarToolbar></NavbarToolbar>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from "vue"
import { useAppStore } from "@/store"
import NavbarToolbar from "./components/navbar-toolbar/navbar-toolbar.vue"
import NavbarMenu from "./components/navbar-menu/navbar-menu.vue"
import { useTitleico } from "@/hooks/titleico"
defineProps({
  isFrame:Boolean
})
const appStore = useAppStore()
const { titleIcoState } = useTitleico()
const width = computed(() => appStore.menuWidth - 20)
const toggleDrawerMenu = inject("toggleDrawerMenu") as () => void
const toggleCollapse = () => {
  if (appStore.device === "desktop")
    appStore.updateSettings({ menuCollapse: !appStore.menuCollapse })
}
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
  justify-content: space-between;
}
.logo {
  height: 24px;
}
</style>
