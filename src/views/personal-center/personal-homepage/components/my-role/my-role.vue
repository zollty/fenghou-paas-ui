<template>
  <div class="my-role" v-if="params.username">
    <ParamTable
      :columns="roleTableColumns"
      :requestApi="getUserRoleByUsername"
      :initParam="params"
      :dataCallback="dealTableData"
      :pagination="false"
      :isShowSearch="false"
      ref="paramTableRef"
    >
      <template #status="{ record }">{{
        record.status == "1" ? "启用" : "禁用"
      }}</template>
      <template #operation="{ record }">
        <a-button type="text" @click="openMoadl(record)">查看权限</a-button>
      </template>
    </ParamTable>
    <a-modal v-model:visible="showModal" :width="600" unmount-on-close>
      <template #title> {{ currentRole && currentRole.name }} </template>
      <template #footer>
        <a-button type="primary" @click="showModal = false">关闭</a-button>
      </template>
      <AuthorityModal :role="currentRole" :appList="appList" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {
  UserInfo,
  getUserRoleByUsername,
  RoleInfo,
  tRoleAppPage,
  AppCenter
} from "@/api/userInfo"
import { DataCallBackReturn } from "@/components/param-table/methods/useTable"
import { Message } from "@arco-design/web-vue"
import { watch, PropType, ref, computed } from "vue"
import { roleTableColumns } from "../../config"
import ParamTable from "@/components/param-table/index.vue"
import AuthorityModal from "./authority-modal.vue"
const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({} as UserInfo)
  }
})
const paramTableRef = ref<any>(null)
const params = ref({
  username: ""
})

const dealTableData = async (res) => {
  if (!res[1] || !res[1].success) {
    Message.error("获取我的角色数据失败")
    return []
  }
  console.log("my-app", res)
  const data = res[1].data as RoleInfo[]
  appMap.value.clear()
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    await getAppByRole(item.roleCode, (val: string) => (item.appNames = val))
  }
  return data
}
const appMap = ref<Map<string, AppCenter[]>>(new Map())
/**通过角色code查询角色有权访问的应用 */
const getAppByRole = async (roleCode: string, cb: (val: string) => void) => {
  const res = await tRoleAppPage({ roleCode, pageSize: 1000 })
  if (!res[1] || !res[1].success) {
    cb("")
    return
  }
  const data = res[1].data.records || []
  appMap.value.set(roleCode, data)
  const val = data.map((i) => i.appName).join(",")
  cb(val)
  return
}

/**是否打开权限查看弹窗 */
const showModal = ref(false)
const appList = ref<AppCenter[]>([])
const currentRole = ref<RoleInfo>()
/**打开权限弹窗 */
const openMoadl = (role: RoleInfo) => {
  if (!role.roleCode || !appMap.value.get(role.roleCode)) return
  appList.value = appMap.value.get(role.roleCode)
  currentRole.value = role
  showModal.value = true
}
watch(
  () => props.userInfo,
  (val) => {
    if (val) {
      params.value.username = val.username
      paramTableRef.value && paramTableRef.value.getTableList()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style scoped lang="less">
.my-role {
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
}
</style>
