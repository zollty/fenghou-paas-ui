import { AppCenter, appCenterPageGet } from "@/api/userInfo"
import { Message } from "@arco-design/web-vue"
import { ref } from "vue"

export default () => {
  const appList = ref<AppCenter[]>([])
  const currentApp = ref<AppCenter>()
  const getAppList = async () => {
    try {
      const res = await appCenterPageGet({
        page: 1,
        pageSize: 10000
      })
      if (!res[1] || !res[1].success) {
        Message.error("获取应用列表失败")
        return
      }
      appList.value = res[1].data.records
      if (appList.value.length>0){
          currentApp.value = appList.value[0]
      }
    } catch (error) {
      console.log(error)
      Message.error("获取应用列表失败")
    }
  }
  getAppList()
  const changeCurrentApp = (app: AppCenter) => {
      if (app.appId === currentApp.value.appId) return
      currentApp.value = app
  }
  return {
    appList,
    currentApp,
    changeCurrentApp
  }
}
