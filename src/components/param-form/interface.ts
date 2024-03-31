import { FormInstance, FormItemInstance } from "@arco-design/web-vue"
import { BreakPoint, Responsive } from "../Grid/interface"

export enum FormItemTypeEnum {
  "自动补全" = "a-auto-complete",
  "级连选择器" = "a-cascader",
  "复选框组" = "a-checkbox-group",
  "输入框" = "a-input",
  "数字输入框" = "a-input-number",
  "标签输入框" = "a-input-tag",
  "提及" = "a-mention",
  "单选框组" = "a-radio-group",
  "评分" = "a-rate",
  "选择器" = "a-select",
  "滑动输入条" = "a-slider",
  "开关" = "a-switch",
  "文本域" = "a-textarea",
  "日期输入器" = "a-date-picker",
  "范围选择器" = "a-range-picker",
  "月份选择器" = "a-month-picker",
  "年份选择器" = "a-year-picker",
  "季度选择器" = "a-quarter-picker",
  "周选择器" = "a-week-picker",
  "时间选择器" = "a-time-picker",
  "数据穿梭框" = "a-transfer",
  "树选择" = "a-tree-select",
  "上传" = "a-upload",
  "其他" = "other"
}

type FormItemProps = FormItemInstance["$props"]
export type FormProps = FormInstance["$props"]
export interface FormEnumProps {
  /** 选项框显示的文字 */
  label: string
  /**选项框值 */
  value: any
  /**是否禁用此选项 */
  disabled?: boolean
  /**为树形选择时，可以通过 children 属性指定子选项 */
  children?: FormEnumProps[]
  [key: string]: any
}
export interface ItemProps extends FormItemProps {
  /**表单项所用的组件 */
  el: FormItemTypeEnum
  /**插槽名 */
  slot?: string
  /**组件尾部插槽名 */
  suffix?: string
  /**组件参数，该属性所有值会透传到所用组件 */
  props?: any
  /**表单项排序（从大到小） */
  order?: number
  /**表单项所占用的列数，默认为1列 */
  span?: number
  /** 搜索字段左侧偏移列数 */
  offset?: number
  /**表单项默认值,优先级小于initData */
  defaultValue?: string | number | boolean | any[]
  /** 选项内容 */
  enum?: FormEnumProps[] | ((params?: any) => Promise<any>) | any[]
}

export type ParamFormItemProps = ItemProps &
  Partial<Record<BreakPoint, Responsive>>

export interface ParamFormProps extends FormProps {
  /**表单标题 */
  title?: string
  /**分组表单的唯一标识 */
  formKey?: string
  /**配置项 */
  columns: ParamFormItemProps[]
  /**初始化表单数据 */
  initData?: Record<any, any>
  /**表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } */
  formCol?: number | Record<BreakPoint, number>
  // 确认按钮文字
  submitButtonText?: string
  //重置按钮文字
  resetButtonText?: string
  //校验错误问题
  validateErrorText?: string
  isShowAction?: boolean
  model: Record<string, any> | undefined
}
