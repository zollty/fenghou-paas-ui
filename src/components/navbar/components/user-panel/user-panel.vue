<template>
  <article class="user-panel">
    <div>账号ID：{{ userInfo.account }}</div>
    <div>登录时间：{{ formatDate(userInfo.loginTime) }}</div>
    <a-divider />
    <section class="content">
      <a-button
        v-for="(item, index) in actions"
        :key="index"
        type="text"
        @click="item.click && item.click()"
      >
        <component :is="item.icon" />
        <span> {{ item.title }} </span>
      </a-button>
    </section>
    <a-divider />
    <a-button long @click="handleLogout">退出登录</a-button>
  </article>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from "vue"
import { useUserStore } from "@/store"
import { doLogout } from "sso-login-logic"
import { envVar } from "@/config"
import dayjs from "dayjs"
import router from "@/router"
interface Actions {
  title: string
  click?: any
  icon: string
}
const userStore = useUserStore()
const userInfo = computed(() => {
  return userStore.userInfo
})
const formatDate = (time?: string) => {
  //const date = new Date(time||null)
  return dayjs(Number(time)).format("YYYY-MM-DD HH:mm:ss")
}
const jumpRouter = inject("jumpRouter") as any
const actions = ref<Actions[]>([
  {
    title: "个人资料",
    icon: "icon-idcard",
    click: () => {
      jumpRouter && jumpRouter("/personal-center/personal-homepage")
    }
  },
  {
    title: "修改密码",
    icon: "icon-edit",
    click: () => {
      jumpRouter && jumpRouter("/personal-center/personal-setting")
    }
  },
  {
    title: "登录日志",
    icon: "icon-cloud",
    click: () => {
      jumpRouter && jumpRouter("/personal-center/login-log")
    }
  },
  {
    title: "操作日志",
    icon: "param-icon-bns_Data-intelligence-middle-platform",
    click: () => {
      jumpRouter && jumpRouter("/personal-center/operation-log")
    }
  }
])
const handleLogout = () => {
  doLogout(envVar.VITE_APP_LOGINBASE_URL)
}
</script>
<style lang="less" scoped>
.user-panel {
  padding: 5px 10px;
  width: 280px;
  color: var(--color-text-1);
  * {
    margin: 4px 0;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
