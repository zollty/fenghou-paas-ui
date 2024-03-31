<template>
  <a-affix
    ref="affixRef"
    :offset-top="offsetTop"
  >
    <div
      ref="warpRef"
      class="tags-warp"
    >
      <a-button
        class="arrow"
        shape="circle"
        @click="scrollHorizontal('left')"
      >
        <template #icon>
          <icon-arrow-left />
        </template>
      </a-button>
      <div
        ref="tagRef"
        class="inline-box"
      >
        <tab-item
          v-for="(tag, index) in tagList"
          :id="tag.fullPath"
          :key="tag.fullPath"
          :index="index"
          :item-data="tag"
        />
      </div>
      <a-button
        class="arrow"
        shape="circle"
        @click="scrollHorizontal('right')"
      >
        <template #icon>
          <icon-arrow-right />
        </template>
      </a-button>
      <!-- <div class="tag-bar-operation"></div> -->
    </div>
  </a-affix>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onUnmounted, nextTick, onMounted } from "vue"
import type { RouteLocationNormalized } from "vue-router"
import {
  listenerRouteChange,
  removeRouteListener
} from "@/utils/route-listener"
import { useAppStore, useTabBarStore } from "@/store"
import tabItem from "./tab-item.vue"

const appStore = useAppStore()
const tabBarStore = useTabBarStore()

const affixRef = ref()
const tagList = computed(() => {
  return tabBarStore.getTabList
})
const offsetTop = computed(() => {
  return appStore.navbar ? 60 : 0
})

watch(
  () => appStore.navbar,
  () => {
    affixRef.value.updatePosition()
  }
)

function scroll(tagId) {
  const target = document.getElementById(tagId)
  if (!target || !tagRef.value) {
    return
  }
  const scrollLeft = tagRef.value.scrollLeft
  const rightOffset =
    target.offsetLeft +
    target.clientWidth -
    scrollLeft -
    tagRef.value.clientWidth
  const leftOffset = target.offsetLeft - scrollLeft
  if (rightOffset > 0) {
    tagRef.value.scrollTo({
      top: 0,
      left: scrollLeft + rightOffset + 100,
      behavior: "smooth"
    })
  } else if (leftOffset < 0) {
    tagRef.value.scrollTo({
      top: 0,
      left: scrollLeft + leftOffset - 100,
      behavior: "smooth"
    })
  }
}

listenerRouteChange((route: RouteLocationNormalized) => {
  if (
    !route.meta.noAffix &&
    !tagList.value.some((tag) => tag.fullPath === route.fullPath)
  ) {
    tabBarStore.updateTabList(route)
    nextTick(() => {
      if (route.fullPath) {
        scroll(route.fullPath)
      }
    })
  }
}, true)
const tagRef = ref(null)
const warpRef = ref(null)
function scrollHorizontal(direction) {
  const left = tagRef.value.scrollLeft
  if (direction === "left") {
    tagRef.value.scrollTo({
      top: 0,
      left: left - 200,
      behavior: "smooth"
    })
  }

  if (direction === "right") {
    tagRef.value.scrollTo({
      top: 0,
      left: left + 200,
      behavior: "smooth"
    })
  }
}
let run = true

function scrollWatch(e: WheelEvent) {
  e.stopPropagation()
  e.preventDefault()
  let timer = setTimeout(() => {
    run = true
  }, 500)
  if (run) {
    if (e.deltaY > 0) {
      /**鼠标下滑 */
      scrollHorizontal("right")
    } else {
      /**鼠标上滑 */
    
      scrollHorizontal("left")
    }
    run = false
  } else {
    clearTimeout(timer)
    timer = null
  }
}
onMounted(() => {
  if (warpRef.value) {
    const dom = warpRef.value as HTMLDivElement
    dom.addEventListener("wheel", (e: WheelEvent) => {
      scrollWatch(e)
    })
  }
})

onUnmounted(() => {
  //removeRouteListener()
  /* if(warpRef.value){
    const dom = warpRef.value as HTMLDivElement
    dom.removeEventListener('wheel',scrollWatch)
  } */
})
</script>

<style scoped lang="less">
.tags-warp {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.inline-box::-webkit-scrollbar {
  display: none;
}
.inline-box {
  flex: 1;
  overflow: auto;
  position: relative;
  margin: 0 10px;
  white-space: nowrap;
  padding: 10px 5px;
  box-sizing: border-box;
  background-color: var(--color-bg-2);
  :deep(.arco-tag) {
    display: inline-flex;
    align-items: center;
    margin-right: 6px;
    cursor: pointer;
    &:first-child {
      .arco-tag-close-btn {
        display: none;
      }
    }
  }
}
</style>
