<template>
  <div class="personal-setting">
    <article class="container">
      <a-tabs default-active-key="baseInfo" lazy-load>
        <a-tab-pane key="baseInfo" title="基本信息"><BaseInfo /> </a-tab-pane>
        <a-tab-pane key="pwdManage" title="密码管理"><PwdManage /> </a-tab-pane>
      </a-tabs>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BaseInfo from "./components/base-info.vue"
import PwdManage from "./components/pwd-manage.vue"
export default defineComponent({
  name:'personalSetting',
  components: {
    BaseInfo,
    PwdManage,
  },
})
</script>

<style scoped lang="less">
.personal-setting {
    width: 100%;
  // padding: 20px;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    background: var(--color-bg-2);
    padding: 20px;
  }
}
</style>
