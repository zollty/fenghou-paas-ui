import { language as jsLanguage } from "monaco-editor/esm/vs/basic-languages/javascript/javascript"

export interface ICodeEditorProps {
  /**代码字符串，用JSON.parse解析 */
  modelValue: string
  /**验证代码规范性方法 */
  codeInspect: (val: string) => boolean
  /**语言 */
  language: 'javascript' | 'html' | 'css' | 'json'
  /**主题 */
  theme: 'vs' | 'vs-dark' | 'vs-black'
  /**只读 */
  readOnly: boolean
}

export const keyWordsMap:Record<ICodeEditorProps["language"],string[]> = {
  javascript: jsLanguage.keywords,
  html: [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ],
css:[],
json:[]
}

// const getKeyWords = (key:ICodeEditorProps["language"]) => {
//   return 
// }