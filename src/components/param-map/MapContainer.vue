<template>
  <article :id="containerId" class="map-container"></article>
</template>
<script lang="ts" setup>

import { baseProps } from "./config/baseProps"
import initMap from "./methods/initMap"
const props = defineProps(baseProps)
const { map, containerId } = initMap(props)
</script>
<style lang="less" scoped>
.map-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
