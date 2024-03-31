import { VITE_SYSTEM_URL_JSON } from "@/config"

export const getUrl = (url: string): string => {
  return new URL(url, import.meta.url).href
}

/**
 * 获取外链应用地址，环境变量里有就用环境变量,没有就取当前域名加子域名
 * @param {String} appName 应用名字
 * @param {String} path 子域名，如果环境变量里没有配置地址必填
 */
export const getAppHref = (appName: string, path?: string) => {
  return VITE_SYSTEM_URL_JSON[appName]
    ? VITE_SYSTEM_URL_JSON[appName]
    : path
    ? `${window.location.origin}/${path}/`
    : ""
}

export function doDownload(url: string, fileName = "下载") {
  const link = document.createElement("a")
  link.style.display = "none"
  link.href = url
  link.setAttribute("download", fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}
