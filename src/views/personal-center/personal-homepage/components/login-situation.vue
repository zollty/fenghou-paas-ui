<template>
  <div class="login-situation">
    <div class="left-content">
      <div class="title">上一次登录</div>
      <div class="content info-list">
        <div class="item" v-for="i in lastLog" :key="i.label">
          <div class="label">{{ i.label }}:</div>
          <div class="value">{{ i.value }}</div>
        </div>
      </div>
      <a-divider />
    </div>
    <div class="center-content">
      <div class="title">30天登录/操作次数统计</div>
      <div class="content chart-content">
        <Chart :options="lineChartOption" />
      </div>
    </div>
    <!-- <div class="right-content">
      <div class="title">30天操作次数统计</div>
      <div class="content"></div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {
  ApiLog,
  LoginLog,
  loginLogPageGet,
  loginLogStaGet,
  LogQueryByParamPageGet,
  LogQueryByParamStaGet,
  LogSta,
  UserInfo
} from "@/api/userInfo"
import { watch, PropType, ref, computed } from "vue"
import { Message } from "@arco-design/web-vue"
import { getDateRage } from "@/utils/tools"
import { getLineChartOption, StaData } from "../config"
import Chart from "@/components/chart/index.vue"
type LastLog = { label: string; value: string }[]

const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({} as UserInfo)
  }
})
const loginLog = ref<LogSta[]>([])
/**获取登录日志 */
const getLoginLogByApi = async () => {
  const date = getDateRage(30)
  const res = await loginLogStaGet({
    username: props.userInfo.username,
    page: 1,
    pageSize: 10000,
    startDate: date.start,
    endDate: date.end
  })
  if (!res[1] || !res[1].success) {
    Message.error("获取登录情况数据失败")
    return
  }
  console.log("login-log", res)
  const data = res[1].data
  loginLog.value = data
}

const lastLog = ref<LastLog>([])
const getLastLog = async () => {
  const res = await loginLogPageGet({
    username: props.userInfo.username,
    page: 1,
    pageSize: 1
  })
  if (!res[1] || !res[1].success) {
    Message.error("获取登录情况数据失败")
    return
  }
  const data = res[1].data.records[0]
  if (!data) return
  lastLog.value = [
    { label: "登录时间", value: data.operationDatetime || "" },
    { label: "登录IP", value: data.clientIp || "" },
    { label: "登录结果", value: data.resultType ? "成功" : "失败" }
  ]
}
/**操作日志 */
const personalLog = ref<LogSta[]>([])
/**获取登录日志 */
const getPersonalLogByApi = async () => {
  const date = getDateRage(30)
  const res = await LogQueryByParamStaGet({
    page: 1,
    pageSize: 10000,
    reqTimeBegin: date.start,
    reqTimeEnd: date.end,
    reqAccount: props.userInfo.username
  })
  if (!res[1] || !res[1].success) {
    Message.error("获取操作情况数据失败")
    return
  }
  console.log("login-log", res)
  const data = res[1].data
  personalLog.value = data
}
/**登录统计 */
const loginSta = ref<StaData>({
  xAxis: [],
  login: [],
  operation: []
})
/**折线图配置 */
const lineChartOption = computed(() => {
  return getLineChartOption(loginSta.value)
})
const getLoginSta = () => {
  const map = new Map<
    StaData["xAxis"][0],
    { login: StaData["login"][0]; operation: StaData["operation"][0] }
  >()
  loginLog.value.forEach((i) => {
    const key = i.date
    if (map.get(key)) {
      map.set(key, Object.assign(map.get(key), { login: i.count }))
    } else {
      map.set(key, { login: i.count, operation: 0 })
    }
  })
  personalLog.value.forEach((i) => {
    const key = i.date
    if (map.get(key)) {
      map.set(
        key,
        Object.assign(map.get(key), {
          operation: i.count
        })
      )
    } else {
      map.set(key, { login: 0, operation: i.count })
    }
  })
  const xAxis = [...map.keys()].sort(
    (a, b) =>
      new Date(a + " 00:00:00").getTime() - new Date(b + " 00:00:00").getTime()
  )
  loginSta.value = {
    xAxis,
    login: xAxis.map((i) => map.get(i).login),
    operation: xAxis.map((i) => map.get(i).operation)
  }
}
watch(
  () => props.userInfo,
  async (val) => {
    if (val.username) {
      await getLoginLogByApi()
      await getPersonalLogByApi()
      await getLastLog()
      getLoginSta()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style scoped lang="less">
.login-situation {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: var(--color-text-2);
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .left-content {
    width: 300px;
  }
  .center-content {
    flex: 1;
    .title {
      width: 100%;
      text-align: center;
    }
  }
}
.info-list {
  font-weight: 600;
  font-size: 14px;
  .item {
    display: flex;
    margin-bottom: 15px;
    .label {
      width: 80px;
      margin-right: 20px;
    }
  }
}
.chart-content {
  width: 100%;
  height: 400px;
}
</style>
