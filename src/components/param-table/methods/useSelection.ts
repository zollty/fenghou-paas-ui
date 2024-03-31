import { TableRowSelection } from "@arco-design/web-vue"
import { ref, computed, ComputedRef, Ref, isRef, proxyRefs, watch } from "vue"

/**
 * @description 表格多选数据操作
 * @param {String} selectId 当表格可以多选时，所指定的 id
 * */
export const useSelection = (
  rowSelection:
    | ComputedRef<TableRowSelection>
    | Ref<TableRowSelection>
    | TableRowSelection,
  rowKey: string,
  tableData: Ref<any[]>
) => {
  const newRowSelection = computed(() =>
    isRef(rowSelection) ? rowSelection.value : rowSelection
  )
  const tableDataMap: Map<any, any> = new Map()
  // 选中的数据列表
  const selectedKeys = ref(
    newRowSelection.value && newRowSelection.value.defaultSelectedRowKeys
      ? newRowSelection.value.defaultSelectedRowKeys
      : []
  )
  const selectedRows = computed(() => {
    return selectedKeys.value
      .map((item) => {
        return tableDataMap.get(item)
      })
      .filter((item) => item)
  })
  watch(
    () => tableData.value,
    () => {
      if (rowKey && tableData.value) {
        tableData.value.forEach((item) => {
          if (item[rowKey]) {
            tableDataMap.set(item[rowKey], item)
          }
        })
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  /**
   * @description 多选操作
   * @param {Array} rowArr 当前选择的所有数据
   * @return void
   */
  const selectionChange = (rowArr: any) => {
    selectedKeys.value = rowArr
  }
  /**清空选中数据列表 */
  const clearSelection = () => (selectedKeys.value = [])
  return {
    selectedKeys,
    clearSelection,
    selectedRows,
    selectionChange
  }
}
