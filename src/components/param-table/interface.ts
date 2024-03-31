import { TableColumnData, TableProps } from '@arco-design/web-vue/es/table/interface'
import { BreakPoint, Responsive } from '../Grid/interface'
export interface ParamTableProps extends Partial<Omit<TableProps, 'data'>> {
  /**列配置项==> 必传 **/
  columns: ColumnProps[]
  /**请求表格数据的api ==> 必传 */
  requestApi: (params: any) => Promise<any>
  /**返回数据的回调函数，可以对数据进行处理 ==> 非必传 */
  dataCallback?: (data: any) => any
  /**搜索查询前处理查询参数 */
  searchCallBack?:(data:Record<string,any>) => Record<string,any>
  /**表格标题，目前只在打印的时候用到 ==> 非必传 */
  title?: string
  /**是否需要分页组件 ==> 非必传（默认为true） */
  pagination?: boolean
  /**初始化请求参数 ==> 非必传（默认为{}） */
  initParam?: any
  /**是否显示表格功能按钮 ==> 非必传（默认为true） */
  toolButton?: boolean
  /**当表格数据多选时，所指定的 id ==> 非必传（默认为 id） */
  selectId?: string
  /**表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } */
  searchCol?: number | Record<BreakPoint, number>
  /**是否显示搜索 */
  isShowSearch?: boolean
}
export interface EnumProps {
  /** 选项框显示的文字 */
  label: string
  /**选项框值 */
  value: any
  /**是否禁用此选项 */
  disabled?: boolean
  /**当 tag 为 true 时，此选择会指定 tag 显示类型 */
  tagType?: string
  /**为树形选择时，可以通过 children 属性指定子选项 */
  children?: EnumProps[]
  [key: string]: any
}
export type TypeProp = 'index' | 'selection' | 'expand'
export type SearchType =
  /**输入框 */
  | 'a-input'
  /**数字输入框 */
  | 'a-input-number'
  | 'a-select'
  | 'a-select-v2'
  | 'a-tree-select'
  /**级连选择器 */
  | 'a-cascader'
  /**日期选择器 */
  | 'a-date-picker'
  /**月份选择器 */
  | 'a-month-picker'
  /**年份选择器 */
  | 'a-year-picker'
  /**范围选择器 */
  | 'a-range-picker'
  | 'a-time-select'
  | 'a-switch'
  | 'a-slider'
export type SearchProps = {
  /**当前项搜索框的类型 */
  el: SearchType
  /**搜索项参数，该属性所有值会透传到组件 */
  props?: any
  /**当搜索项 key 不为 dataIndex 属性时，可通过 key 指定 */
  key?: string
  /**搜索项排序（从大到小） */
  order?: number
  /**搜索项所占用的列数，默认为1列 */
  span?: number
  /** 搜索字段左侧偏移列数 */
  offset?: number
  /**搜索项默认值 */
  defaultValue?: string | number | boolean | any[]
} & Partial<Record<BreakPoint, Responsive>>

export interface ColumnProps extends TableColumnData {
  /**是否显示在表格当中 */
  isShow?: boolean //
  /**搜索项配置 */
  search?: SearchProps | undefined //
  /** 枚举类型（渲染值的字典） */
  enum?: EnumProps[] | ((params?: any) => Promise<any>)
  /**当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据） */
  isFilterEnum?: boolean
  /**指定 label && value 的 key 值 */
  fieldNames?: { label: string; value: string }
  /**自定义表头内容渲染（tsx语法） */
  headerRender?: (row: ColumnProps) => any
  /**与列设置关联的 */
  checked?: boolean
  /**多级表头 */
  _children?: ColumnProps[]
}
