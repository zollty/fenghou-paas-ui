import AMapLoader from "@amap/amap-jsapi-loader"
import { shallowRef, onUnmounted } from "vue"
import { baseInitConfig } from "../config/baseConfig"
import { IParamMapProps } from "../type/props"
import MapLocation from "./location"
export default function initMap(props: IParamMapProps) {
  const map = shallowRef(null)
  const containerId = shallowRef("map-container")
  const mapInstance = shallowRef(null)
  async function init() {
    try {
      /** */
      props.initBefore && props.initBefore()
      const initParams = Object.assign(baseInitConfig, props.loadConfig)
      const AMapInstance = await AMapLoader.load(initParams)
      mapInstance.value = AMapInstance
      map.value = new AMapInstance.Map(containerId.value, {
        viewMode: "3D", //是否为3D地图模式
        zoom: 5, //初始化地图级别
        zooms: [2, 22],
        center: [105.602725, 37.076636] //初始化地图中心点位置
      })
      AMapInstance.plugin("AMap.ToolBar", function () {
        //异步加载插件
        const toolbar = new AMapInstance.ToolBar()
        map.value.addControl(toolbar)
      })
      console.log(map.value, mapInstance.value)
      props.initAfter && props.initAfter(map, mapInstance)
      map.value.on("complete", function () {
        // 地图图块加载完成后触发
        props.loadAfter && props.loadAfter(map, mapInstance)
        const { IpLocation, BrowserLocation } = MapLocation(mapInstance.value)
      })
    } catch (error) {
      console.log(error)
      props.errorAfter && props.errorAfter(error)
    }
  }
  init()

  onUnmounted(() => {
    map.value && map.value.destroy()
  })

  return {
    map,
    mapInstance,
    containerId
  }
}
