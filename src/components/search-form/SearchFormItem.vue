<template>
  <component
    :is="column.search.el"
    v-if="column.search?.el"
    v-bind="handleSearchProps"
    v-model="searchParam[column.search.key ?? handleProp(column.dataIndex!)]"
    :data="column.search?.el === 'tree-select' ? columnEnum : []"
    :options="
      ['cascader', 'select'].includes(column.search?.el)
        ? columnEnum
        : column.search.props?.options
        ? column.search.props.options
        : []
    "
    :placeholder="placeholder"
    :clearable="clearable"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  >
    <template v-if="column.search.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.search.el === 'a-select'">
      <component
        :is="'a-option'"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="searchFormItem">
import { computed, inject, ref, PropType } from "vue"
import { handleProp } from "@/utils/util"
import { ColumnProps } from "@/components/param-table/interface"

interface SearchFormItem {
  column: any | ColumnProps
  searchParam: { [key: string]: any }
}
const props = defineProps({
  column: {
    type: Object as PropType<SearchFormItem["column"]>,
    default: () => ({})
  },
  searchParam: {
    type: Object as PropType<SearchFormItem["searchParam"]>,
    default: () => ({})
  }
})

// 判断 fieldNames 设置 label && value 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? "label",
    value: props.column.fieldNames?.value ?? "value"
  }
})

// 接收 enumMap
const enumMap = inject("enumMap", ref(new Map()))
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.dataIndex)
  if (!enumData) return []
  if (props.column.search?.el === "select-v2" && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return {
        ...item,
        label: item[fieldNames.value.label],
        value: item[fieldNames.value.value]
      }
    })
  }
  return enumData
})

// 处理透传的 searchProps(el 为 tree-select、cascader 的时候需要给下默认 label 和 value)
const handleSearchProps = computed(() => {
  const label = fieldNames.value.label
  const value = fieldNames.value.value
  const searchEl = props.column.search?.el
  const searchProps = props.column.search?.props ?? {}
  let handleProps = searchProps
  if (searchEl === "tree-select")
    handleProps = {
      ...searchProps,
      props: { label, ...searchProps.props },
      nodeKey: value
    }
  if (searchEl === "cascader")
    handleProps = {
      ...searchProps,
      props: { label, value, ...searchProps.props }
    }
  return handleProps
})

// 判断 placeholder
const placeholder = computed(() => {
  const search = props.column.search
  if (search?.props?.placeholder) return search?.props?.placeholder
  if (search.el.includes("picker")) return undefined
  if (search.el.includes("input")) return "请输入"
  if (search.el.includes("select")) return "请选择"
  return "请输入"
})

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column.search
  return (
    search?.props?.clearable ??
    (search?.defaultValue == null || search?.defaultValue == undefined)
  )
})
</script>
