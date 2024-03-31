<template>
  <div
    v-if="columns.length"
    class="search-from"
    :style="{ marginBottom: isSm ? '20px' : '0px' }"
  >
    <a-form ref="formRef" :model="searchParam" auto-label-width>
      <!-- <a-row :justify="isSm?'end':'start'"> -->
      <a-row>
        <a-col :flex="isSm ? 'none' : 1" style="min-width: 500px">
          <Grid ref="gridRef" :gap="[10, 0]" :cols="searchCol">
            <GridItem
              v-for="(item, index) in columns"
              :key="item.dataIndex"
              v-bind="getResponsive(item)"
              :index="index"
            >
              <a-form-item :label="`${item.title} :`">
                <slot
                  :name="(item.dataIndex || item.search.key) + 'Item'"
                  :item="item"
                >
                  <SearchFormItem :column="item" :search-param="searchParam">
                    <slot
                      :name="item.dataIndex || item.search.key"
                      :item="item"
                    ></slot>
                  </SearchFormItem>
                </slot>
              </a-form-item>
            </GridItem>
          </Grid>
        </a-col>
        <a-divider v-if="!isSm" style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space :direction="isSm ? 'horizontal' : 'vertical'" :size="18">
            <a-button
              :class="{ 'search-margin': isSm }"
              type="primary"
              @click="search"
            >
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
            <slot name="moreBtn"></slot>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts" name="SearchForm">
import { computed, ref } from "vue"
import { ColumnProps } from "../param-table/interface"
import { BreakPoint } from "@/components/Grid/interface"
import SearchFormItem from "./SearchFormItem.vue"
import Grid from "@/components/Grid/index.vue"
import GridItem from "@/components/Grid/components/GridItem.vue"

interface ProTableProps {
  columns?: ColumnProps[] // 搜索配置列
  searchParam?: { [key: string]: any } // 搜索参数
  searchCol: number | Record<BreakPoint, number>
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
  isSm?: boolean
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({})
})
const isSm = computed(
  () =>
    props.isSm ||
    breakPoint.value === "sm" ||
    breakPoint.value === "xs" ||
    props.searchCol <= 2
)
// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl
  }
}

// 获取响应式断点
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)
</script>
<style lang="less" scoped>
:deep {
  .arco-form-item-label {
    white-space: nowrap !important;
  }
}
.search-margin {
  margin-left: 20px;
}
</style>
