<template>
  <div class="personal-homepage">
    <header class="top-user-info">
      <user-info :userInfo="userInfo" />
    </header>
    <div class="bottom-content">
      <a-tabs default-active-key="LoginSituation" lazy-load>
        <a-tab-pane key="LoginSituation" title="最新动态">
          <LoginSituation :userInfo="userInfo" />
        </a-tab-pane>
        <a-tab-pane key="MyApp" title="我的应用"> <MyApp /> </a-tab-pane>
        <a-tab-pane key="MyRole" title="我的角色">
          <MyRole :userInfo="userInfo" />
        </a-tab-pane>
        <a-tab-pane key="MyAuthority" title="我的权限">
          <MyAuthority :userInfo="userInfo" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import UserInfo from "./components/user-info.vue"
import LoginSituation from "./components/login-situation.vue"
import MyApp from "./components/my-app/my-app.vue"
import MyAuthority from "./components/my-authority/my-authority.vue"
import MyRole from "./components/my-role/my-role.vue"
import getData from "@/hooks/getUser"

export default defineComponent({
  name:'personalHomepage',
  components: {
    UserInfo,
    LoginSituation,
    MyApp,
    MyAuthority,
    MyRole
  },
  setup() {
    return {
      ...getData()
    }
  }
})
</script>

<style scoped lang="less">
.personal-homepage {
  height: 100%;
  display: flex;
  flex-direction: column;
  // padding: 20px;
  .top-user-info {
    padding: 20px;
    background: url(~'@/assets/images/user-profile-bg.png');
    background-color: var(--color-bg-5);
    background-size: cover;
  }
  .bottom-content {
    background: var(--color-bg-2);
    flex: 1;
  }
}
</style>
