<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>

    <a-breadcrumb-item v-for="item in menus" :key="item">
      {{ item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default() {
      return []
    }
  }
})
const router = useRouter()
const menus = computed(() => {
  if (props.items.length > 0 && props.items) return props.items
  const m = router.currentRoute.value.matched
  return m.map((item) => item.meta.menuName || "").filter((item) => !!item)
})
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 16px 0;
  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));
    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
