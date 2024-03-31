<template>
  <article class="rich-content">
    <tinymce-editor
      :id="id"
      v-model="content"
      :initial-value="modelValue"
      :init="init"
      :witdh="width"
      :height="height"
      :resize="resize"
      :disabled="disabled"
    />
  </article>
</template>
<script lang="ts" setup>
//@tinymce/tinymce-vue参考：https://www.tiny.cloud/docs/tinymce/6/vue-ref/
import tinymce from "tinymce/tinymce"
import TinymceEditor from "@tinymce/tinymce-vue"
import baseEditorOptions from "@/config/richConfig"
import { baseRichProps } from "./richProps"
import { isEmpty } from "lodash"
import { useRefState } from "@/hooks/state"
const props = defineProps(baseRichProps)
const emits = defineEmits(["update:modelValue"])
const [content, setContent, setEffet] = useRefState(props.modelValue)
setEffet((n) => {
  emits("update:modelValue", n)
})
const init = Object.assign(baseEditorOptions, {
  width: props.width,
  height: props.height,
  resize: props.resize,
  statusbar: props.statusbar,
  menubar: isEmpty(props.menubar) ? baseEditorOptions.menubar : props.menubar,
  toolbar: isEmpty(props.toolbar) ? baseEditorOptions.toolbar : props.toolbar
})
function getRichText() {
  return content.value
}
defineExpose({
  getRichText
})
</script>
<style lang="less" scoped>
.rich-content {
}
</style>
