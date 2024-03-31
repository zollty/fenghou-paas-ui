import { FormItemTypeEnum } from '../interface'

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(el: FormItemTypeEnum) {
  if (
    [
      FormItemTypeEnum['自动补全'],
      FormItemTypeEnum['输入框'],
      FormItemTypeEnum['数字输入框'],
      FormItemTypeEnum['标签输入框']
    ].includes(el)
  )
    return '请输入'

  if ([FormItemTypeEnum['级连选择器'], FormItemTypeEnum['选择器'], FormItemTypeEnum['树选择']].includes(el))
    return '请选择'
  if (FormItemTypeEnum['提及'] === el) return '请输入@'
  return undefined
}

/**
 * a.b.c 1
 * {c:1}
 * {b: {c:1}}
 * {a:{b: {c:1}}}
 */
export const setPath = (data: Object, path: string, value: any) => {
  const arr = path.split('.')
  if (arr.length === 1) {
    data[path] = value ?? null
  } else {
    let obj = {}
    obj[arr[arr.length - 1]] = value ?? null
    console.log(JSON.stringify(obj))
    for (let index = arr.length - 2; index >= 0; index--) {
      const item = arr[index]
      const oldObj = Object.assign({}, obj)
      obj = {}
      obj[item] = oldObj
      console.log(JSON.stringify(obj))
    }
    data = {
      ...data,
      ...obj
    }
  }
  return data
}
