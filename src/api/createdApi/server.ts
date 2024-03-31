import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"
import {
  handleRequestHeader,
  handleAuth,
  handleNetworkError,
  handleResponseError
} from "./tool"
export interface DefaultReturn<T> {
  /** 响应结果 */
  data?: T
  /** 响应代码 */
  code?: number
  /** 响应消息 */
  msg?: string
  errorMsg?:string
  /** 成功标志 */
  success?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn = (data: DefaultReturn<any>) => unknown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IAnyObj = Record<any, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createApi = (params: CreateAxiosDefaults<any>): AxiosInstance => {
  const server = axios.create(params)

  server.interceptors.request.use(
    // @ts-ignore
    (config) => {
      let result = handleRequestHeader(config)

      result = handleAuth(result)
      return result
    },
    (err) => {
      Promise.reject(err.response)
    }
  )
  server.interceptors.response.use(
    (res) => {
      if (res.status !== 200) return Promise.reject(res.data)
      if (!handleResponseError(res.data)) return Promise.reject(res.data)
      return res
    },
    (err) => {
      handleNetworkError(err.response.status)
      Promise.reject(err.response)
    }
  )
  return server
}
export default createApi
