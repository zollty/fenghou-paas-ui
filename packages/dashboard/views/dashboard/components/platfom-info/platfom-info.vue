<template>
  <div class="platform-info">
    <a-row class="card-row" v-for="(i, index) in infoData" :key="index">
      <a-col>
        <div
          class="info-card"
          :style="{ color: i.color, background: i.bgColor }"
        >
          <div class="title">{{ i.title }}</div>
          <template v-if="i.content">
            <div
              class="info-item"
              v-for="(info, _index) in i.content"
              :key="_index"
            >
              <div :class="['info-text',(!!info.list && info.list.length)?'has-child':'']">{{ info.info }}</div>
              <template v-if="!!info.list && info.list.length">
                <li
                  class="info-list-item"
                  v-for="(item, __index) in info.list"
                  :key="__index"
                >
                  {{ item }}
                </li>
              </template>
            </div>
          </template>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import useHooks from "./hooks"

const { infoData } = useHooks()
</script>

<style scoped lang="less">
.info-card {
  padding: 14px 7px;
  .title {
    line-height: 18px;
    font-weight: 700;
    font-size: 13px;
  }
  .info-item {
    font-size: 12px;
    margin-top: 7px;
    .info-text.has-child{
        margin-bottom: 10px;
    }
  }
}
.platform-info .card-row{
    margin-top: 14px;
}
.platform-info .card-row:first-child{
    margin-top: 0;
}
</style>
