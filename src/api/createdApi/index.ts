import { envVar } from "@/config"
import { Message } from "@arco-design/web-vue"
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"
import createApi, { DefaultReturn, Fn, IAnyObj } from "./server"
import { fetchExport } from "./fetch"
import { getToken } from "sso-login-logic"
import { doDownload } from "@/utils/url"

const service = createApi({
  /** 配合 vue.config.js做代理 */
  baseURL: envVar.VITE_API_BASE_URL,
  timeout: 30000 // 请求超时时间
})

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  headers?: RawAxiosRequestHeaders,
  clearFn?: Fn
): Promise<[any, DefaultReturn<T> | undefined]> =>
  new Promise((resolve) => {
    service
      .get(url, { params, headers })
      .then((result) => {
        let res: DefaultReturn<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as DefaultReturn<T>
        } else {
          res = result.data as DefaultReturn<T>
        }
        resolve([null, res as DefaultReturn<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Post = <T>(
  url: string,
  data: IAnyObj = {},
  params: IAnyObj = {},
  headers?: RawAxiosRequestHeaders
): Promise<[any, DefaultReturn<T> | undefined]> =>
  new Promise((resolve) => {
    service
      .post(url, data, { params, headers })
      .then((result) => {
        const res: DefaultReturn<T> = result.data
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
const api = (params: AxiosRequestConfig<any>) => {
  return service(params)
}
export const upload = (formData: FormData) => {
  return Post(
    envVar.VITE_APP_UPLOAD_URL,
    formData,
    {},
    { "Content-Type": "multipart/form-data" }
  )
}
export async function Export(
  data: {
    url: string
    params: IAnyObj
    headers?: RawAxiosRequestHeaders
    dealBlob?: (data: any) => Blob
  },
  fileType = "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  fileName = "导出"
): Promise<[any, Blob | undefined]> {
  try {
    const { url, params = {}, headers = undefined, dealBlob = undefined } = data
    const result = await service({
      url,
      method: "get",
      params,
      headers,
      responseType: "blob"
    })
    if (result.data && result.data.errorCode && !result.data.success) {
      Message.error(result.data.errorMsg || "未查询到数据")
      return [result.data.errorMsg, undefined]
    }
    const blob = dealBlob
      ? dealBlob(result.data)
      : (new Blob([result.data], {
          type: `application/${fileType};charset=UTF-8`
        }) as Blob)

    const _url = window.URL.createObjectURL(blob)
    doDownload(_url,fileName)
    return [null, blob]
  } catch (error) {
    return [error, undefined]
  }
}
export const _fetchExport = async (option: {
  url: string
  params: IAnyObj
  headers?: RawAxiosRequestHeaders
  fileType?: string
  fileName?: string
}) => {
  const {
    url,
    params = {},
    headers = {},
    fileType = "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileName = "导出"
  } = option
  const _url = envVar.VITE_API_BASE_URL + url
  const _headers = new Headers()
  _headers.append("x-app-code", envVar.VITE_SERVER_XAppCode)
  _headers.append(envVar.VITE_SERVER_TOKEN_NAME, getToken())
  _headers.append("accept", "application/json, text/plain, */*")
  _headers.append("accept-language", "application/json, text/plain, */*")
  _headers.append("cache-control", "no-cache")
  _headers.append("pragma", "no-cache")
  try {
    const res = await fetchExport({
      url: _url,
      params: params,
      requestOptions: {
        method: "get",
        headers: _headers,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        mode: "cors",
        credentials: "omit"
      }
    })
    if (!res) {
      return undefined
    }
    const blob = new Blob([res], {
      type: `application/${fileType};charset=UTF-8`
    }) as Blob
    const _Url = window.URL.createObjectURL(blob)
    doDownload(_Url,fileName)
    return
  } catch (error) {
    console.log(error)
    return undefined
  }
}
api.post = Post
api.get = Get
api.upload = upload
api.export = Export
api.fetchExport = _fetchExport
export default api
