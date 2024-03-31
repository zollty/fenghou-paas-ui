// eslint-disable-next-line @typescript-eslint/no-unused-vars
window.changeConfig = (config) => {
  // config.VITE_APP_API_URL = ""
  //外链系统地址配置,格式为appName:url
  config.VITE_SYSTEM_URL_JSON = Object.assign({}, config.VITE_SYSTEM_URL_JSON, {
    // sysmgmt: "http://sit-app.paramst.cn/app-sysmgmt/",
    // resourceCenter: "http://sit-app.paramst.cn/app-resource-center/",
    // serviceCenter: "http://sit-app.paramst.cn/app-service-center/",
    // opsMonitor: "http://sit-app.paramst.cn/app-ops-monitor/",
    // twin: "http://sit-app.paramst.cn/app-twin/"
  })

  return config
}
