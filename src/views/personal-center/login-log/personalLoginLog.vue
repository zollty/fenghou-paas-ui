<template>
  <div class="login-log">
    <div class="container">
      <SearchForm
        :columns="formColumns"
        :search-param="params"
        :search-col="1"
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
        :columns="tableColumns"
        :request-api="loginLogPageGet"
        :init-param="params"
        :data-callback="dealTableData"
        :search-call-back="searchCallBack"
        :is-show-search="false"
      >
        <template #clientIp="{ record }">
          {{
            formatIp(record.clientIp)
          }}
        </template>
      </ParamTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import ParamTable from "@/components/param-table/index.vue"
import { tableColumns, formColumns } from "./config"
import {
  LoginLog,
  loginLogExport,
  loginLogPageGet,
  LogLoginGetParams
} from "@/api/userInfo"
import { DataCallBackReturn } from "@/components/param-table/methods/useTable"
import { Message } from "@arco-design/web-vue"
import { DefaultPageReturns } from "@/api/createdApi/common"
import getUserInfo from "@/hooks/getUser"
import SearchForm from "@/components/search-form/searchForm.vue"
import { getDateRage } from "@/utils/tools"
const name = "personalLoginLog"
const getDefaultDate = () => {
  const _date = getDateRage(24, "h")
  return [_date.start, _date.end]
}
const formatIp = (ip:string) => {
  if (!ip) return ""
  return ip.split(",")[0]
}

const params = ref<LogLoginGetParams>({
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
  console.log("search", data)
  params.value.dateRange = params.value.dateRange || getDefaultDate()
  const date = params.value.dateRange
  return Object.assign({}, data, {
    page: data.current,
    startDate: date[0],
    endDate: date[1],
    dateRange: undefined,
    username: username.value
  })
}
const dealSearch = () => {
  console.log("dealSearch", params.value, tableRef.value)
  tableRef.value && tableRef.value.getTableList()
}
const resetSearch = () => {
  // Object.keys(params.value).forEach(i => params.value[i] = undefined)
  // params.value.page = 1,
  // params.value.pageSize = 10
  params.value.dateRange = undefined
  tableRef.value && tableRef.value.reset()
}
/**导出 */
const exportLog = async () => {
  try {
    const date = params.value.dateRange || []
    await loginLogExport({
      page: 1,
      pageSize: 1000,
      username: username.value,
      startDate: date[0],
      endDate: date[1]
    })
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
</style>
