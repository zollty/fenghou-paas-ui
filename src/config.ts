import { isObject, isString } from "./utils/is"

/**
 * 配置转换函数, 以便于生产环境的项目拿来直接修改部分参数使用
 * 例如修改服务器接口请求地址: VITE_SERVER_API_URL
 */
declare global {
  interface Window {
    changeConfig: <T>(config: T) => T
  }
}

/** 所有环境变量, 在下面分别导出(其他文件引用时显示vscode提示) */
const _globalConfig = window.changeConfig({
  /** 基础接口地址 */
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  /** 当前环境 */
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV as string,
  /** 当前系统列表,所有为*，排列为,分割的字符串 */
  VITE_SYSTEM_LIST: import.meta.env.VITE_SYSTEM_LIST as string,
  /**单点登录地址 */
  VITE_APP_LOGINBASE_URL: import.meta.env.VITE_APP_LOGINBASE_URL as string,
  /**文件上传地址 */
  VITE_APP_UPLOAD_URL: import.meta.env.VITE_APP_UPLOAD_URL as string,
  /**请求头的token名称 */
  VITE_SERVER_TOKEN_NAME: import.meta.env.VITE_SERVER_TOKEN_NAME as string,
  /**请求头的x-app-code的值 */
  VITE_SERVER_XAppCode: import.meta.env.VITE_SERVER_XAppCode as string,
  /**线上组件库地址 */
  VITE_APP_COMPONENT_URL: import.meta.env.VITE_APP_COMPONENT_URL as string,
  /** 域名*/
  VITE_APP_URL_DOMAIN: import.meta.env.VITE_APP_URL_DOMAIN as string,
  /**系统地址配置,JSON字符串=>object */
  VITE_SYSTEM_URL_JSON: (() => {
    try {
      const jsonStr = import.meta.env.VITE_SYSTEM_URL_JSON as string
      return (
        jsonStr && isObject(JSON.parse(jsonStr)) ? JSON.parse(jsonStr) : {}
      ) as Record<string, string>
    } catch (error) {
      console.log(error)
      return {}
    }
  })(),
  /**地址关键字，环境变量里包含该关键字会将关键字替换成当前源（协议+域名+端口） */
  VITE_APP_URL_KEY: "{BASE_URL}"
})
const globalConfig = filterConfig(_globalConfig)

export const envVar = globalConfig
const {
  VITE_API_BASE_URL,
  VITE_NODE_ENV,
  VITE_SYSTEM_LIST,
  VITE_APP_LOGINBASE_URL,
  VITE_APP_UPLOAD_URL,
  VITE_SERVER_TOKEN_NAME,
  VITE_SERVER_XAppCode,
  VITE_APP_COMPONENT_URL,
  VITE_APP_URL_DOMAIN,
  VITE_SYSTEM_URL_JSON
} = globalConfig
export {
  VITE_API_BASE_URL,
  VITE_NODE_ENV,
  VITE_SYSTEM_LIST,
  VITE_APP_LOGINBASE_URL,
  VITE_APP_UPLOAD_URL,
  VITE_SERVER_TOKEN_NAME,
  VITE_SERVER_XAppCode,
  VITE_APP_COMPONENT_URL,
  VITE_APP_URL_DOMAIN,
  VITE_SYSTEM_URL_JSON
}

function filterConfig(config: Record<string, any>) {
  const urlKey = config.VITE_APP_URL_KEY
  if (!urlKey) return config
  Object.keys(config).forEach((key) => {
    if (key != "VITE_APP_URL_KEY" && config[key]) {
      if (isString(config[key]) && config[key].includes(urlKey)) {
        config[key] = config[key].replace(urlKey, window.location.origin)
      } else if (isObject(config[key])) {
        config[key] = filterConfig(config[key])
      }
    }
  })
  return config
}
