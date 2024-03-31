import { TreeNodeData } from "@arco-design/web-vue"

type TargetContext = '_self' | '_parent' | '_blank' | '_top'

export const openWindow = (url: string, opts?: { target?: TargetContext; [key: string]: any }) => {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(',')
  )
}

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
)

/** 转换数字为以逗号分隔的字符串 */
export const translateNumber = (val: number | string, len?: number) => {
  if (len === undefined || isNaN(Number(val))) return val
  /** 处理小数 */
  const strArr = val.toString().split(".")
  const strVal = String(strArr[0])
  let str = ""
  for (let i = strVal.length; i >= 0; ) {
    const preI = i - len < 0 ? 0 : i - len
    const newValue = strVal.substring(preI, i)
    if (!newValue) break
    if (str) {
      str = newValue + "," + str
    } else {
      str = newValue
    }
    i -= len
  }
  return strArr[1] ? str + "." + strArr[1] : str
}

export default null

export function searchArcoTree(keyword:string,data:TreeNodeData[],key:string,childrenKey:string) {
  const loop = (data) => {
    const result = [];
    data.forEach(item => {
      if (item[key].toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({...item});
      } else if (item[childrenKey]) {
        const filterData = loop(item[childrenKey]);
        if (filterData.length) {
          result.push({
            ...item,
            [childrenKey]: filterData
          })
        }
      }
    })
    return result;
  }
  return loop(data);
}
