<template>
  <article class="param-form-group">
    <template v-for="(item, index) in cloumns" :key="index">
      <a-card class="card">
        <ParamForm v-bind="item" :is-show-action="false">
          <template
            v-for="slot in Object.keys($slots)"
            #[slot]="data"
            :key="slot"
          >
            <slot :name="slot" v-bind="data"></slot>
          </template>
        </ParamForm>
      </a-card>
    </template>

    <slot name="group-actions" :map="formMap">
      <a-card class="actions">
        <a-space>
          <a-button type="primary" @click="submit">提交</a-button>
          <a-button @click="reset">重置</a-button>
        </a-space>
      </a-card>
    </slot>
  </article>
</template>
<script lang="ts" setup>
import ParamForm from "../param-form/index.vue"
import { PropType, Ref, provide } from "vue"
import { ParamFormGroup } from "./interface"
import { FormInstance, Message } from "@arco-design/web-vue"
defineProps({
  cloumns: {
    type: Array as PropType<ParamFormGroup["cloumns"]>,
    default: () => []
  }
})
const emits = defineEmits(["reset", "submit"])
/**存放各个表单的ref与formData */
const formMap: Map<string, { refs: Ref<FormInstance>; formData: Ref<any> }> =
  new Map()
function setFormRefs(key: string, refs: Ref<FormInstance>, formData: Ref<any>) {
  formMap.set(key, {
    refs,
    formData
  })
}
/**下方，方便让各个表单收集 */
provide("setFormRefs", setFormRefs)
function reset() {
  formMap.forEach((item) => {
    const refs = item.refs.value
    refs?.resetFields()
    refs?.clearValidate()
  })
  emits("reset", formMap)
}
async function submit() {
  try {
    const arr = []
    const resultMap = new Map()
    formMap.forEach((item, key) => {
      const refs = item.refs.value
      arr.push(refs?.validate())
      resultMap.set(key, item.formData)
    })
    const res = await Promise.all(arr)
    if (res.some(item=>!!item)) {
      console.log("通过")
      Message.warning("请完善表单")
    } else {
      emits("submit", resultMap)
    }
  } catch (error) {
    Message.error(error)
  }
}
</script>
<style lang="less" scoped>
.param-form-group {
}
.card {
  margin-bottom: 10px;
}
.actions {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
