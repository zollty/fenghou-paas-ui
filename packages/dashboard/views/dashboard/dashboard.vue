<template>
  <div class="dashboard">
    <KpiList />
    <Charts class="charts" />
    <a-card class="frame-img-card spcimg">
      <div class="frame-img-container">
        <div class="title">
          <!-- <div class="chinese-title">
            平台架构图
          </div>
          <div class="english-title">
            PLATFORM ARCHITECTURE DIAGRAM
          </div> -->
        </div>
        <!-- <platformImg /> -->
        <img
          :src="pimg"
          style="width: 100%; padding: auto;"
        />
      </div>
    </a-card>
    <a-grid
      :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }"
      :col-gap="12"
      :row-gap="12"
    >
      <a-grid-item>
        <a-card title="平台简介">
          <PlatformInfo />
        </a-card>
      </a-grid-item>
      <a-grid-item>
        <a-card title="关键技术">
          <TechnologyStack />
        </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import KpiList from "./components/kpi-list/kpi-list.vue"
import Charts from "./components/charts/charts.vue"
import PlatformInfo from "./components/platfom-info/platfom-info.vue"
import TechnologyStack from "./components/technology-stack/technology-stack.vue"
import pimg from "../../assets/imgs/fenghou0001.png"
export default defineComponent({
  components: {
    KpiList,
    Charts,
    PlatformInfo,
    TechnologyStack
  },
  setup() {
    
    return {
      pimg
    }
  }
})
</script>

<style scoped lang="less">
.spcimg {
  :deep(.arco-card-body) {
    padding: 0px 0px;
  }
}
.charts {
  margin: 12px 0;
}
.frame-img-card {
  margin-top: 14px;
}
.frame-img-container {
  position: relative;
  .frame-img {
    display: block;
    width: 100%;
  }
  .title {
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 18px;
    font-weight: 700;
    font-size: 18px;
    .english-title {
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.3);
      font-size: 12px;
    }
    .chinese-title{
      position: relative;
    }
    .chinese-title::before {
      position: absolute;
      top: 50%;
      left: -20px;
      width: 8px;
      height: 8px;
      background-color: #1d39c4;
      border: 1px solid #b4c0da;
      transform: translateY(-50%);
      content: " ";
    }
  }
}
</style>
