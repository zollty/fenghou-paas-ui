import { getUserInfo, UserInfo } from "@/api/userInfo"
import { Message } from "@arco-design/web-vue"
import { ref } from "vue"

export default () => {
  const userInfo = ref<UserInfo>({})
  /**通过api获取用户信息 */
  const getUserInfoByApi = async () => {
    const res = await getUserInfo()
    if (!res[1] || !res[1].success) {
      Message.error("获取用户信息失败")
      return
    }
    userInfo.value = res[1].data
  }
  getUserInfoByApi()
  return {
    userInfo,
    getUserInfoByApi
  }
}
