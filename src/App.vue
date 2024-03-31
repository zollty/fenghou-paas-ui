<template>
  <a-config-provider :locale="zhCN">
    <router-view v-slot="{ Component, route }">
      <transition
        v-if="route.matched.length <= 1"
        name="fade"
        mode="out-in"
        appear
      >
        <!-- route.matched.length = 1 一级路由下无子菜单，=2有二级菜单，=3有三级菜单，-->
        <DefaultLayout>
          <component
            :is="Component"
            :key="route.fullPath"
          />
        </DefaultLayout>
      </transition>
      <component
        :is="Component"
        v-else-if="route.meta.ignoreCache"
        :key="route.fullPath"
      />
      <keep-alive
        v-else
        :include="cacheList"
      >
        <component
          :is="Component"
          :key="route.fullPath"
        />
      </keep-alive>
    </router-view>
    <global-setting />
  </a-config-provider>
</template>
<script lang="ts" setup>
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn"
import GlobalSetting from "@/components/global-setting/index.vue"
import DefaultLayout from "./layout/default-layout.vue"

import { initTitleico } from "./hooks/titleico"
import { computed } from "vue"
import { useTabBarStore } from "@/store"

const tabBarStore = useTabBarStore()
initTitleico()
const cacheList = computed(() => tabBarStore.getCacheList)
</script>
