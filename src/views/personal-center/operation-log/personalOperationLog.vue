<template>
  <div class="login-log">
    <div class="container">
      <SearchForm
        :columns="searchColumns"
        :search-param="params"
        :search-col="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }"
        :search="dealSearch"
        :reset="resetSearch"
      >
        <template #dateRange>
          <a-button>
            {{
              (params.dateRange && params.dateRange.join(" 至 ")) ||
                "请选择日期范围"
            }}
          </a-button>
        </template>
        <template #moreBtn>
          <a-button
            v-throttle="exportLog"
            type="secondary"
          >
            <template #icon>
              <icon-download />
            </template>
            导出
          </a-button>
        </template>
      </SearchForm>
      <ParamTable
        v-if="username"
        ref="tableRef"
        class="log-table"
        :columns="tableColumns"
        :request-api="LogQueryByParamPageGet"
        :init-param="params"
        :data-callback="dealTableData"
        :search-call-back="searchCallBack"
        :is-show-search="false"
      >
        <template #apiType="{ record }">
          {{
            getApiType(record.apiType)
          }}
        </template>
        <template #resResultType="{ record }">
          {{
            record.resResultType ? "成功" : "失败"
          }}
        </template>
        <template #reqClientIp="{ record }">
          {{
            formatIp(record.reqClientIp)
          }}
        </template>
      </ParamTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import ParamTable from "@/components/param-table/index.vue"
import { tableColumns, getSearchColumns } from "./config"
import {
  LoginLog,
  LogQueryByParamPageGet,
  LogLoginGetParams,
  getApiType,
  LogQueryByParamPageParams,
  appCenterPageGet,
  AppCenter,
  getLogMetaList,
  AppModule,
  logExportByParam
} from "@/api/userInfo"
import { DataCallBackReturn } from "@/components/param-table/methods/useTable"
import { Message, SelectOptionData } from "@arco-design/web-vue"
import { DefaultPageReturns } from "@/api/createdApi/common"
import SearchForm from "@/components/search-form/searchForm.vue"
import getUserInfo from "@/hooks/getUser"
import { getDateRage } from "@/utils/tools"
const name = "personalOperationLog"
const getDefaultDate = () => {
  const _date = getDateRage(1, "h")
  return [_date.start, _date.end]
}
const formatIp = (ip:string) => {
  if (!ip) return ""
  return ip.split(",")[0]
}
const params = ref<LogQueryByParamPageParams>({
  page: 1,
  pageSize: 10,
  dateRange: getDefaultDate()
})
const tableRef = ref(null)
/**获取用户信息 */
const { userInfo } = getUserInfo()
const username = computed(() => userInfo.value.username || "")

const dealTableData = (res): DataCallBackReturn => {
  if (!res[1] || !res[1].success) {
    Message.error("获取登录日志数据失败")
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      list: []
    }
  }
  const data = res[1].data as DefaultPageReturns<LoginLog>
  return {
    current: data.page,
    pageSize: data.pageSize,
    total: data.total,
    list: data.records || []
  }
}
const searchCallBack = (data: Record<string, any>) => {
  params.value.dateRange = params.value.dateRange || getDefaultDate()
  const date = params.value.dateRange
  return Object.assign({}, data, params.value, {
    page: data.current,
    pageSize: data.pageSize,
    reqAccount: username.value,
    reqTimeBegin: date[0],
    reqTimeEnd: date[1],
    dateRange:undefined
  } as LogQueryByParamPageParams)
}
const dealSearch = () => {
  console.log("dealSearch", params.value, tableRef.value)
  tableRef.value && tableRef.value.getTableList()
}
const resetSearch = () => {
  Object.keys(params.value).forEach((i) => (params.value[i] = undefined))
  tableRef.value && tableRef.value.reset()
}
/**应用列表 */
const appList = ref<SelectOptionData[]>([])
const getAppList = async () => {
  const res = await appCenterPageGet({
    page: 1,
    pageSize: 10000
  })
  if (!res[1] || !res[1].success) {
    Message.error("获取我的应用数据失败")
    return
  }
  const data = res[1].data.records || []
  appList.value = data.map((i) => ({
    label: i.appName,
    value: i.appCode
  }))
}
getAppList()
/**应用模块 */
const moduleList = ref<SelectOptionData[]>([])
const apiList = ref<SelectOptionData[]>([])
const moduleData = ref<AppModule[]>([])
const getModuleList = async () => {
  if (!params.value.httpProvider) return
  const res = await getLogMetaList(params.value.httpProvider)
  if (!res[1] || !res[1].success) {
    return
  }
  const data = res[1].data
  moduleData.value = data
  moduleList.value = data.map((i) => ({
    label: i.apiModule,
    value: i.apiModule
  }))
}
watch(
  () => params.value.httpProvider,
  () => {
    moduleList.value.length = 0
    moduleData.value.length = 0
    apiList.value.length = 0
    params.value.apiModule = undefined
    params.value.apiType = undefined
    getModuleList()
  }
)
watch(
  () => params.value.apiModule,
  (val) => {
    apiList.value.length = 0
    params.value.apiType = undefined
    if (val) {
      const item = moduleData.value.find(
        (i) => i.apiModule === params.value.apiModule
      )
      if (!item) return
      apiList.value = item.apiNames.map((i) => ({
        label: i.apiName,
        value: i.apiId
      }))
    }
  }
)
// const searchColumns = computed(() =>
//   getSearchColumns({
//     appList: appList.value,
//     moduleList: moduleList.value,
//     apiList: apiList.value
//   })
// )
const searchColumns = getSearchColumns({
  appList: appList.value,
  moduleList: moduleList.value,
  apiList: apiList.value
})
/**导出 */
const exportLog = async () => {
  try {
    const date = params.value.dateRange || []
    await logExportByParam(
      Object.assign({}, params.value, {
        page: 1,
        pageSize: 1000,
        reqAccount: username.value,
        reqTimeBegin: date[0],
        reqTimeEnd: date[1]
      } as LogQueryByParamPageParams)
    )
  } catch (error) {
    console.log(error)
    Message.error("导出日志失败")
  }
}
</script>

<style scoped lang="less">
.login-log {
  // padding: 20px;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    background: var(--color-bg-2);
    padding: 10px;
  }
}
.log-table{
  margin-top: 10px;
}
</style>
