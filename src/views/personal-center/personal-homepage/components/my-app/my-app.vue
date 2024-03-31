<template>
  <div class="my-app">
    <ParamTable
      :columns="columns"
      :requestApi="appCenterPageGet"
      :initParam="params"
      :dataCallback="dealTableData"
      :isShowSearch="false"
    >
      <template #status="{ record }">{{
        record.status == "1" ? "启用" : "禁用"
      }}</template>
      <template #url="{ record }"
        ><a-link v-if="record.url" :href="record.url">{{ record.url }}</a-link>
        <span v-else></span>
      </template>
    </ParamTable>
  </div>
</template>

<script setup lang="ts">
import {
  AppCenter,
  appCenterPageGet,
  AppCenterPageParams,
  UserInfo
} from "@/api/userInfo"
import { Message } from "@arco-design/web-vue"
import ParamTable from "@/components/param-table/index.vue"
import { watch, PropType, ref } from "vue"
import { ColumnProps } from "@/components/param-table/interface"
import { DefaultReturn } from "@/api/createdApi/server"
import { DefaultPageReturns } from "@/api/createdApi/common"
import { DataCallBackReturn } from "@/components/param-table/methods/useTable"
const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({} as UserInfo)
  }
})
const params = ref<AppCenterPageParams>({
  page: 1,
  pageSize: 10
})
const appData = ref<AppCenter[]>([])
/**获取用户的应用 */
const dealTableData = (res): DataCallBackReturn => {
  if (!res[1] || !res[1].success) {
    Message.error("获取我的应用数据失败")
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      list: []
    }
  }
  console.log("my-app", res)
  const data = res[1].data as DefaultPageReturns<AppCenter>
  return {
    current: data.page,
    pageSize: data.pageSize,
    total: data.total,
    list: data.records || []
  }
}
const columns: ColumnProps[] = [
  {
    title: "应用名称",
    dataIndex: "appName"
  },
  {
    title: "应用标识",
    dataIndex: "appCode"
  },
  {
    title: "应用状态",
    dataIndex: "status",
    slotName: "status"
  },
  {
    title: "应用链接",
    dataIndex: "url",
    slotName: "url"
  }
]
</script>

<style scoped lang="less">
.my-app {
  width: calc(100% - 30px);
  padding-left: 30px;
  padding-bottom: 20px;
}
</style>
