import { IinitParams } from "../type/config"

const baseInitConfig: IinitParams = {
  key: "97e3a8e1c31f7176c327d78bdfe91a56",
  version: "2.0",
  plugins: ["AMap.ToolBar", "AMap.Driving","AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    version: "1.1",
    plugins: []
  },
  Loca: {
    version: "2.0.0"
  }
}

export { baseInitConfig }
