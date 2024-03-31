<template>
  <div id="monaco" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  watch,
  ref,
  PropType,
  Ref,
  onUnmounted
} from "vue"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import "monaco-editor/esm/vs/editor/editor.all.js"
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js"
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution"
import "monaco-editor/esm/vs/basic-languages/html/html.contribution"
import "monaco-editor/esm/vs/basic-languages/css/css.contribution"
import "monaco-editor/esm/vs/language/json/monaco.contribution"

import { ICodeEditorProps, keyWordsMap } from "./interface"
import { Message } from "@arco-design/web-vue"

export default defineComponent({
  name: "CodeEditor",
  props: {
    /**代码内容 */
    modelValue: {
      type: String,
      required: true
    },
    /**代码检查方法，检查是否符合规范 */
    codeInspect: {
      type: Function as PropType<ICodeEditorProps["codeInspect"]>
    },
    /**语言 */
    language: {
      type: String as PropType<ICodeEditorProps["language"]>,
      default: "javascript"
    },
    /**主题 */
    theme: {
      type: String as PropType<ICodeEditorProps["theme"]>,
      default: "vs-dark"
    },
    /**是否只读 */
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let monacoInstance = reactive({} as monaco.editor.IStandaloneCodeEditor)
    const codeValue: Ref<string> = ref("")

    // @ts-ignore
    self.MonacoEnvironment = {
      getWorker(_: string, label: string) {
        if (label === "json") {
          return new jsonWorker()
        }
        if (["css", "scss", "less"].includes(label)) {
          return new cssWorker()
        }
        if (["html", "handlebars", "razor"].includes(label)) {
          return new htmlWorker()
        }
        if (["typescript", "javascript"].includes(label)) {
          return new tsWorker()
        }
        return new EditorWorker()
      }
    }
    watch(
      () => props.modelValue,
      (val) => {
        codeValue.value = val
        if (val == (monacoInstance.getValue && monacoInstance.getValue())) {
          return
        } else {
          monacoInstance.setValue && monacoInstance.setValue(codeValue.value)
        }
      },
      {
        deep: true,
        immediate: true
      }
    )
    watch(
      [() => props.language, () => props.theme],
      () => {
        // monacoInstance.updateOptions(getOption())
        monacoInstance.dispose()
        initInstance()
      },
      { deep: true }
    )
    const timer: Ref<number | null> = ref(null)

    /**获取配置 */
    const getOption = () =>
      ({
        value: codeValue.value,
        language: props.language,
        theme: props.theme,
        readOnly: props.readOnly,
        automaticLayout: true,
        foldingStrategy: "indentation",
        autoClosingQuotes: "always"
      } as monaco.editor.IStandaloneEditorConstructionOptions)
    /**初始化实例 */
    const initInstance = () => {
      const dom = document.getElementById("monaco")
      monacoInstance = monaco.editor.create(dom as HTMLElement, getOption())
      monacoInstance.onDidChangeModelContent(() => {
        if (
          JSON.stringify(codeValue.value, null, 2) === monacoInstance.getValue()
        )
          return
        try {
          const jsonValue = monacoInstance.getValue()
          // 判断输入是否符合规则
          if (!props.codeInspect || props.codeInspect(jsonValue)) {
            emit("update:modelValue", jsonValue)
          } else {
            Message.error("请按照规则输入")
          }
        } catch {
          // json转换错误
          if (timer.value) {
            window.clearTimeout(timer.value as number)
            timer.value = null
          }
          timer.value = window.setTimeout(() => {
            Message.error("格式不符合规范")
          }, 500)
        }
      })
      getNextCode()
    }
    /**创建代码提醒(提示比较基础，远远不够强大) */
    const getNextCode = () => {
      monaco.languages.registerCompletionItemProvider(props.language, {
        // @ts-ignore
        provideCompletionItems: function (model, position) {
          console.log(model, position)
          var suggestions = keyWordsMap[props.language].map((item: string) => ({
            label: item,
            insertText: item,
            kind: monaco.languages.CompletionItemKind["Keyword"],
            detail: item
          }))
          return {
            suggestions
          }
        }
      })
    }

    onMounted(() => {
      initInstance()
    })

    onUnmounted(() => {
      monacoInstance.dispose()
    })

    return {
      monacoInstance,
      codeValue
    }
  }
})
</script>
