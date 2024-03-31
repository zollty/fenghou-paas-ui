export const fetchExport = async (option: {
  url: string
  params: Record<string, any>
  requestOptions: {
    method: "get" | "post"
    headers: Headers
    redirect?: RequestRedirect
    [x: string]: any
  }
}) => {
  const { url, requestOptions, params } = option
  const param = getParamStr(params)
  try {
    const res = await fetch(url + `${param ? "?" + param : ""}`, requestOptions)
    const blob = await res.blob()
    console.log("download", blob)
    return blob
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const getParamStr = (params: Record<string, any>) => {
  const keys = Object.keys(params)
  if (!keys.length) return ""
  let param = ""
  keys.forEach((key) => {
    if (
      params[key] !== "" &&
      typeof params[key] !== "undefined" &&
      params[key] !== null
    ) {
      if (param != "") {
        param += "&"
      }
      let str = params[key]
      if (typeof str === "string" && str.includes(" ")) {
        str = str.replace(" ", "+")
      }
      param += key + "=" + str
    }
  })
  return param
}
