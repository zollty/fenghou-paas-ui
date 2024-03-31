<template>
  <div class="kpi-list">
    <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }" :col-gap="12" :row-gap="12">
      <a-grid-item v-for="i in KpiListData" :key="i.key">
        <div class="list-item">
          <img :src="i.img" alt="" class="left-img" />
          <div class="right-content">
            <div class="label">{{ i.name }}</div>
            <div class="value"><NumberTo :splitLength="3" :value="i.value"/></div>
          </div>
        </div>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import useHooks from "./hooks"
import NumberTo from '@/components/number-to/number-to.vue'
const { KpiListData } = useHooks()
</script>

<style scoped lang="less">
.list-item {
  display: flex;
  align-items: center;
  height: 80px;
  background: var(--color-bg-2);
  border-radius: 4px;
  cursor: pointer;
  &:hover{
      box-shadow: 0px 0px 8px 2px rgba(0,0,0,0.5)
  }
  .left-img {
    margin:0 15px;
    width: 50px;
    height: 50px;
  }
  .right-content {
    color: var(--color-text-2);
    .label{
        font-size: 16px;
        font-weight: 500;
    }
    .value{
        font-size: 18px;
        font-weight: 600;
    }
  }
}
</style>
