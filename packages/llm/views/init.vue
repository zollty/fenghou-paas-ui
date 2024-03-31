<template>
  <article class="init">
    <Teleport to="#right-toolbar">
    </Teleport>
  </article>
</template>
<script lang="ts">
/**该文件用于每个package的公用加载，会挂载到layout上
 * 可在这里写一些当前package的通用方法，比如provide一些东西
 * 如果写dom请用teleport方法传递到各个dom
 */
import { defineComponent } from "vue"
export default defineComponent({
  name: "InitVue",
  components: {},
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.init {
  box-sizing: border-box;
}
</style>
