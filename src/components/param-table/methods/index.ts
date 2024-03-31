import { ColumnProps, ParamTableProps } from '../interface'
import { useTable } from './useTable'
import { provide, reactive, ref, watch, getCurrentInstance, computed } from 'vue'
import { Table, TableRowSelection } from '@arco-design/web-vue'
import { useSelection } from './useSelection'
import { cloneDeep } from 'lodash'
export default function (props: ParamTableProps) {
  const Instance = getCurrentInstance()
  const rowSelection = computed<TableRowSelection>(
    () => Instance.attrs['row-selection'] || Instance.attrs['rowSelection'] || undefined
  )
  const rowKey = computed<string | undefined>(
    () => (Instance.attrs['rowKey'] as string) || (Instance.attrs['row-key'] as string) || undefined
  )
  /**表格组件Ref */
  const tableRef = ref<InstanceType<typeof Table>>()
  const stripe = ref(true)

  /**表格操作Hooks */
  const {
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    loading
  } = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback,props.searchCallBack)

  // 表格选择 Hooks
  const { selectedKeys, clearSelection, selectedRows, selectionChange } = useSelection(
    rowSelection,
    rowKey.value as string,
    tableData
  )

  /**监听页面initParams变化，重新获取数据表格 */
  watch(() => props.initParam, getTableList, { deep: true })

  /**接受cloumns并设置为响应式 */
  const tableColumns = ref<ColumnProps[]>(props.columns)

  const enumMap = ref(new Map<string, { [key: string]: any }[]>())
  provide('enumMap', enumMap)
  const setEnumMap = async (col: ColumnProps) => {
    if (!col.enum) return
    if (typeof col.enum !== 'function') return enumMap.value.set(col.dataIndex, col.enum)
    const { data } = await col.enum()
    enumMap.value.set(col.dataIndex, data)
  }

  /** 扁平化 columns */
  const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
    columns.forEach(col => {
      if (col._children && col._children.length) flatArr.push(...flatColumnsFunc(col._children))
      flatArr.push(col)

      // 给每一项 column 添加 isShow && isFilterEnum 默认属性
      col.isShow = col.isShow ?? true
      col.isFilterEnum = col.isFilterEnum ?? true

      /**设置enumMap */
      setEnumMap(col)
    })
    return flatArr.filter(item => !item._children && !item._children?.length)
  }

  // flatColumns
  const flatColumns = ref<ColumnProps[]>([])
  flatColumns.value = flatColumnsFunc(tableColumns.value)

  // 过滤需要搜索的配置项 && 处理搜索排序
  const searchColumns = flatColumns.value
    .filter(item => item.search?.el)
    .sort((a, b) => (b.search?.order ?? 0) - (a.search?.order ?? 0))

  /**根据列设置过度之后的columns */
  const showColumns = ref<ColumnProps[]>([])
  watch(
    () => props.columns,
    val => {
      tableColumns.value = cloneDeep(val)
      tableColumns.value.forEach((item, index) => {
        item.checked = true
        item.ellipsis = item.ellipsis || true
        item.tooltip = item.tooltip || true
      })
      showColumns.value = cloneDeep(tableColumns.value)
    },
    { deep: true, immediate: true }
  )
  const handleChange = (checked: boolean | (string | boolean | number)[], column: ColumnProps, index: number) => {
    if (!checked) {
      tableColumns.value = tableColumns.value.filter(item => item.dataIndex !== column.dataIndex)
    } else {
      tableColumns.value.splice(index, 0, column)
    }
  }
  /**
   * @description 处理 dataIndex，当 dataIndex 为多级嵌套时 ==> 返回最后一级 dataIndex
   * @param {String} dataIndex 当前 dataIndex
   * @return string
   * */
  function handleDataIndex(dataIndex: string) {
    const dataIndexArr = dataIndex.split('.')
    if (dataIndexArr.length == 1) return dataIndex
    return dataIndexArr[dataIndexArr.length - 1]
  }

  // 设置搜索表单的默认值
  searchColumns.forEach(column => {
    if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
      searchInitParam.value[column.search.key ?? handleDataIndex(column.dataIndex!)] = column.search?.defaultValue
    }
  })

  /**设置密度 */
  const densityState: {
    size: 'mini' | 'medium' | 'large' | 'small'
    options: any
  } = reactive({
    size: 'medium',
    options: [
      {
        name: '迷你',
        value: 'mini'
      },
      {
        name: '偏小',
        value: 'small'
      },
      {
        name: '中等',
        value: 'medium'
      },
      {
        name: '偏大',
        value: 'large'
      }
    ]
  })
  function changeDensitySize(val) {
    densityState.size = val
  }

  return {
    tableRef,
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    clearSelection,
    tableColumns,
    enumMap,
    flatColumns,
    selectedKeys,
    selectionChange,
    searchColumns,
    loading,
    densityState,
    changeDensitySize,
    stripe,
    handleChange,
    showColumns,
    selectedRows
  }
}
