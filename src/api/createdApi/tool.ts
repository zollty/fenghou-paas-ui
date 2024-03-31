import { envVar } from '@/config'
import { Message } from '@arco-design/web-vue'
import { AxiosRequestConfig } from 'axios'
import { doLogoutBy401, getToken } from 'sso-login-logic'
import { DefaultReturn } from './server'
interface myAxiosRequestConfig extends AxiosRequestConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any
}
/**维护常用的header */
export const handleRequestHeader = (config: myAxiosRequestConfig) => {
  return config
}
/**维护token */
export const handleAuth = (config: myAxiosRequestConfig) => {
  if (config && config.headers && !config.headers[envVar.VITE_SERVER_TOKEN_NAME]) {
    config.headers[envVar.VITE_SERVER_TOKEN_NAME] = getToken() as string
  }
  /** 设置默认 x-app-code 标识 */
  if (config && config.headers && !config.headers['x-app-code']) {
    config.headers['x-app-code'] = envVar.VITE_SERVER_XAppCode
  }
  return config
}
/**请求错误处理 */
export const handleNetworkError = (errStatus: number) => {
  let errMessage = '未知错误'
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        doLogoutBy401(envVar.VITE_APP_LOGINBASE_URL, () => {
          Message.error('登录信息已过期')
        })
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errStatus}`
    }
  } else {
    errMessage = '无法连接到服务器！'
  }
  Message.error(errMessage)
  return
}

/**接口调用错误处理 */
export const handleResponseError = (data: DefaultReturn<any>): boolean => {
  if (data.code === 500) {
    Message.error(`${data.msg ? data.msg : '发生错误'}`)
    return false
  }

  if ((data.code === 200 || data.code === 400) && !data.success) {
    Message.error(`${data.msg ? data.msg : '发生错误'}`)
    return false
  }

  if (data.code === 401) {
    /**401处理 */
    doLogoutBy401(envVar.VITE_APP_LOGINBASE_URL, () => {
      Message.error('登录信息已过期')
    })

    return false
  }
  return true
}
