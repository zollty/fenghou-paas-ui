<template>
  <article class="navbar-menu">
    <a-menu
      v-show="systemList.length > 1"
      mode="horizontal"
      :selected-keys="[activeKey]"
      :default-selected-keys="[activeKey]"
      :default-collapsed="false"
    >
      <a-menu-item
        v-for="item in systemList"
        :key="item.key"
        @click="runSystem(item)"
        >{{ item.name }}
        <template v-if="item.icon" #icon>
          <MyIcon :name="item.icon"></MyIcon>
        </template>
      </a-menu-item>
    </a-menu>
  </article>
</template>
<script lang="ts" setup>
import { getCurrentSystemList } from "@/router/system"
import { SystemList } from "#/interface"
import MyIcon from "@/components/my-icon/my-icon.vue"
import { useTitleico } from "@/hooks/titleico"
import { useMenuStore, useTabBarStore } from "@/store"
import { computed, watch } from "vue"
import { useRouter } from "vue-router"
const { $state, setCurrentSystemKey } = useMenuStore()
const activeKey = computed(() => $state.currentSystemKey)
const systemList = getCurrentSystemList()
const router = useRouter()

const { resetTabList, updateTabList } = useTabBarStore()
const { setTitleState } = useTitleico()
function runSystem(system: SystemList) {
  router.push({
    path: system.defaultRoutePath
  })
}
watch(
  () => activeKey.value,
  () => {
    resetTabList()
    updateTabList(router.currentRoute.value)
  }
)
watch(
  () => router.currentRoute.value.meta.system,
  (newVal) => {
    if (newVal) {
      const system = setCurrentSystemKey(newVal as string)
      if (system) {
        setTitleState({
          ico: system.ico,
          title: system.name,
          img: system.img
        })
      }
    } else {
      setCurrentSystemKey(activeKey.value)
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="less" scoped>
.navbar-menu {
  box-sizing: border-box;
  flex: 1;
}
</style>
