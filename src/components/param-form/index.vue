<template>
  <article class="param-form">
    <div v-if="title" class="title">{{ title }}</div>
    <a-form ref="formRef" v-bind="$attrs" :model="formData">
      <Grid ref="gridRef" :gap="[20, 0]" :cols="formCol">
        <GridItem
          v-for="(column, index) in formColumns"
          :key="column.field"
          v-bind="getResponsive(column)"
          :index="index"
        >
          <a-form-item v-bind="column" :label="`${column.label} :`">
            <!--判断插槽-->
            <template v-if="column.slot">
              <slot
                :name="column.slot"
                :model="formData"
                :column="column"
                :field="column.field"
                :value="formData[column.field]"
              >
              </slot>
            </template>

            <!--复选框组-->
            <template v-else-if="column.el === FormItemTypeEnum['复选框组']">
              <a-checkbox-group
                v-model:value="formData[column.field]"
                v-bind="column.props"
              >
                <a-space>
                  <a-checkbox
                    v-for="item in enumMap.get(column.field) || []"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.label }}</a-checkbox
                  >
                </a-space>
              </a-checkbox-group>
            </template>

            <!--单选框组-->
            <template v-else-if="column.el === FormItemTypeEnum['单选框组']">
              <a-radio-group v-model:value="formData[column.field]">
                <a-space>
                  <a-radio
                    v-for="item in enumMap.get(column.field) || []"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio>
                </a-space>
              </a-radio-group>
            </template>
            <!--动态渲染表单组件-->
            <component
              v-bind="column.props"
              :is="column.el"
              v-else
              v-model="formData[column.field]"
            >
              <!-- 表单组件的插槽 -->
              <template v-if="column.props.slot">
                <slot
                  :name="column.props.slot"
                  :value="formData[column.field]"
                ></slot>
              </template>
            </component>
            <!--组件后面的内容-->
            <template v-if="column.suffix">
              <slot
                :name="column.suffix"
                :model="formData"
                :field="column.field"
                :value="formData[column.field]"
              >
              </slot>
            </template>
          </a-form-item>
        </GridItem>
      </Grid>
    </a-form>
    <a-divider v-if="isShowAction" />
    <slot name="actions" :model="formData" :form-ref="formRef">
      <section v-if="isShowAction" class="actions">
        <a-space>
          <a-button type="primary" @click="submit">{{
            submitButtonText
          }}</a-button>
          <a-button @click="reset">{{ resetButtonText }}</a-button>
        </a-space>
      </section>
    </slot>
  </article>
</template>
<script lang="ts" setup name="param-form">
import { FormInstance, Message } from "@arco-design/web-vue"
import { inject, provide, reactive, ref, watch } from "vue"
import { BreakPoint } from "../Grid/interface"
import Grid from "../Grid/index.vue"
import GridItem from "../Grid/components/GridItem.vue"
import { ParamFormItemProps, FormItemTypeEnum } from "./interface"
import { createPlaceholderMessage, setPath } from "./methods/utils"
import { isUnNull } from "@/utils/is"
import { cloneDeep } from "lodash"
interface ParamFormProps {
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
}
const props = withDefaults(defineProps<ParamFormProps>(), {
  title: "",
  formKey: "",
  columns: () => [],
  initData: () => ({}),
  formCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  submitButtonText: "提交",
  resetButtonText: "重置",
  validateErrorText: "请完善表单！",
  isShowAction: true
})
const emits = defineEmits(["reset", "submit"])
const formRef = ref<FormInstance>()
const formData = ref({})
const formColumns = ref<ParamFormItemProps[]>([])
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide("enumMap", enumMap)
const setEnumMap = async (column: ParamFormItemProps) => {
  if (!column.enum) return
  if (typeof column.enum !== "function")
    return enumMap.value.set(column.field, column.enum)
  const data = await column.enum()
  enumMap.value.set(column.field, data)
}
/**初始化formData和formColumns */
watch(
  [() => props.columns, () => props.initData],
  () => {
    const baseData = cloneDeep(formData.value)
    formColumns.value = props.columns.map((item) => {
      /**如果formData里面不存在这个值 */
      if (!baseData[item.field]) {
        setPath(baseData, item.field, item.defaultValue)
      }

      const compProps = item.props ?? {}
      /**用reactive包裹一次 不然会丢失响应 */
      item.props = reactive({
        clearable: compProps.clearable ?? true,
        placeholder: compProps.placeholder || createPlaceholderMessage(item.el),
        ...compProps
      })
      if (!isUnNull(item.defaultValue))
        item.props["default-value"] = item.defaultValue
      if (!isUnNull(props.initData[item.field]))
        item.props["default-value"] = props.initData[item.field]
      setEnumMap(item).then(() => {
        if (item.el === FormItemTypeEnum["级连选择器"]) {
          item.props.options =
            item.props.options ?? enumMap.value.get(item.field) ?? undefined
        }
        if (item.el === FormItemTypeEnum["选择器"]) {
          item.props.options =
            item.props.options ?? enumMap.value.get(item.field) ?? undefined
          item.props.fieldNames = item.props.fieldNames || {
            value: "value",
            label: "label"
          }
        }
        if (
          [
            FormItemTypeEnum["自动补全"],
            FormItemTypeEnum["数据穿梭框"],
            FormItemTypeEnum["树选择"]
          ].includes(item.el)
        ) {
          let enums = enumMap.value.get(item.field)
          item.props.data = item.props.data ?? enums ?? undefined
        }
      })
      return item
    })
    console.log(formColumns.value)
    formData.value = {
      ...baseData,
      ...props.initData
    }
  },
  {
    deep: true,
    immediate: true
  }
)
// 获取响应式设置
const getResponsive = (item: ParamFormItemProps) => {
  return {
    span: item.span,
    offset: item.offset ?? 0,
    xs: item.xs,
    sm: item.sm,
    md: item.md,
    lg: item.lg,
    xl: item.xl
  }
}

const reset = () => {
  formRef.value?.resetFields()
  formRef.value?.clearValidate()
  emits("reset")
}
const submit = async () => {
  try {
    const res = await formRef.value?.validate()
    if (res) {
      Message.warning(props.validateErrorText)
    } else {
      emits("submit", formData.value)
    }
  } catch (error) {
    Message.error(error)
  }
}
const setFormRefs: any = inject("setFormRefs")
setFormRefs && setFormRefs(props.formKey, formRef, formData)

defineExpose({
  formRef,
  formData,
  formColumns,
  enumMap
})
</script>
<style lang="less" scoped>
.title {
  color: var(--color-text-1);
  font-weight: 500;
  line-height: 1.5715;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  padding: 10px 0;
}
:deep {
  .arco-form-item-label {
    white-space: nowrap !important;
  }
}
.actions {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
