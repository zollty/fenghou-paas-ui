<template>
  <div class="technology-stack">
    <div class="header-button-list">
      <a-button
        class="button"
        v-for="(i, index) in btnList"
        :key="index"
        :style="{ background: i.color, borderColor: i.color }"
        size="mini"
        @click="i.clickFn && i.clickFn()"
        >{{ i.name }}</a-button
      >
    </div>
    <a-table
      :columns="tableColumns"
      :data="technologyData"
      :bordered="{ cell: true }"
      :pagination="false"
    >
    <template #link="{ record }">
      <a-link @click="openLink(record.link)">{{record.link}}</a-link>
    </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import useHooks from "./hooks"
const { btnList, technologyData, tableColumns,openLink } = useHooks()
</script>

<style scoped lang="less">
.header-button-list {
  margin-bottom: 7px;
  .button {
    margin-right: 7px;
    margin-bottom: 7px;
    color: #fff;
  }
}
</style>
