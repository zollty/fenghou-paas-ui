<template>
  <div class="chart-list">
    <a-grid
      :cols="{ xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }"
      :col-gap="12"
      :row-gap="12"
    >
      <a-grid-item>
        <a-card title="登录次数统计">
          <div class="chart-content">
            <Chart :options="barChartOption" />
          </div>
        </a-card>
      </a-grid-item>
      <a-grid-item>
        <a-card title="资源数量统计">
          <div class="chart-content">
            <Chart :options="lineChartOption" />
          </div>
        </a-card>
      </a-grid-item>
      <a-grid-item>
        <a-card title="24小时请求统计">
          <div class="chart-content">
            <Chart :options="roseChartOption" />
          </div>
        </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import useLogin from "./hooks/useLogin"
import Chart from "@/components/chart/index.vue"
import useApiSta from "./hooks/useApiSta"
import useResourceSta from "./hooks/useResourceSta"
const { barChartOption } = useLogin()
const { roseChartOption } = useApiSta()
const { lineChartOption } = useResourceSta()
</script>

<style scoped lang="less">
.chart-content {
  height: 250px;
}
</style>
