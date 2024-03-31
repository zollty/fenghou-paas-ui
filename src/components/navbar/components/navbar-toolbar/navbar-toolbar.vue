<template>
  <ul class="right-side r">
    <!--  <li v-if="systemList.length>6">
      <a-select v-model="select" :style="{width:'200px'}" placeholder="系统搜索" allow-search allow-clear>
        <template #arrow-icon>
          <IconSearch></IconSearch>
        </template>
        <a-option v-for="item in systemList" :key="item.key" :value="item.defaultRoutePath" >{{ item.name }}</a-option>
      </a-select>
    </li> -->
    <!-- 此LI标签永远放在第一位置，勿动顺序  -->
    <li>
      <a-tooltip
        content="跳转到风后AI®技术文档库"
      >
        <div
          class="logo-box"
          @click="openPt"
        >
          <img
            src="data:image/png;base64,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"
            alt=""
            class="pt-logo"
          />
        </div>
      </a-tooltip>
    </li>
    <li>
      <a-dropdown
        trigger="hover"
        @select="handleSelect"
      >
        <span><icon-link /> 外链系统</span>
        <template #content>
          <a-doption :value="getAppHref('webchat', 'app-landscape-bigscreen')">
            <template #icon>
              <icon-dashboard />
            </template>
            <template #default>
              风后Chat（前端）
            </template>
          </a-doption>
          <a-doption :value="getAppHref('fhrag', 'app-ops-monitor')">
            <template #icon>
              <icon-code-sandbox />
            </template>
            <template #default>
              风后RAG企业知识库
            </template>
          </a-doption>
          <a-doption :value="getAppHref('redis', 'app-ops-monitor')">
            <template #icon>
              <icon-scan />
            </template>
            <template #default>
              RAG检索平台
            </template>
          </a-doption>
          <a-doption :value="getAppHref('autogen', 'app-param-view')">
            <template #icon>
              <icon-palette />
            </template>
            <template #default>
              AutoGen
            </template>
          </a-doption>
          <a-doption :value="getAppHref('serviceCenter', 'app-service-center')">
            <template #icon>
              <icon-code-sandbox />
            </template>
            <template #default>
              OpenAI学习
            </template>
          </a-doption>
          <a-doption :value="getAppHref('opsMonitor', 'app-ops-monitor')">
            <template #icon>
              <icon-scan />
            </template>
            <template #default>
              Prompt实操
            </template>
          </a-doption>
          <a-doption :value="getAppHref('langchain', 'app-landscape-bigscreen')">
            <template #icon>
              <icon-dashboard />
            </template>
            <template #default>
              Langchain
            </template>
          </a-doption>
        </template>
      </a-dropdown>
    </li>
    <!-- end of first LI  -->
    <div
      id="right-toolbar"
      class="right-side"
    ></div>
    <li
      v-for="(i, index) in LinkList"
      :key="index"
    >
      <a-tooltip :content="i.tooltip">
        <a-button
          class="nav-btn"
          type="outline"
          :shape="'circle'"
          @click="i.clickFn && i.clickFn()"
        >
          <template #icon>
            <component
              :is="i.iconCom"
              v-if="i.iconCom"
            />
            <div
              v-else
              :class="i.iconClass"
            ></div>
          </template>
        </a-button>
      </a-tooltip>
    </li>
    <li>
      <a-tooltip
        :content="
          theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
        "
      >
        <a-button
          class="nav-btn"
          type="outline"
          :shape="'circle'"
          @click="handleToggleTheme"
        >
          <template #icon>
            <icon-sun-fill v-if="theme === 'light'" />
            <icon-moon-fill v-else />
          </template>
        </a-button>
      </a-tooltip>
    </li>
    <!-- <li>
      <a-tooltip content="消息通知">
        <div class="message-box-trigger">
          <a-badge :count="9" dot>
            <a-button
              class="nav-btn"
              type="outline"
              :shape="'circle'"
              @click="setPopoverVisible"
            >
              <icon-notification />
            </a-button>
          </a-badge>
        </div>
      </a-tooltip>
      <a-popover
        trigger="click"
        :arrow-style="{ display: 'none' }"
        :content-style="{ padding: 0, minWidth: '400px' }"
        content-class="message-popover"
      >
        <div ref="refBtn" class="ref-btn"></div>
        <template #content>
          <message-box />
        </template>
      </a-popover>
    </li> -->
    <li>
      <a-tooltip
        :content="isFullscreen ? '点击退出全屏模式' : '点击切换全屏模式'"
      >
        <a-button
          class="nav-btn"
          type="outline"
          :shape="'circle'"
          @click="toggleFullScreen"
        >
          <template #icon>
            <icon-fullscreen-exit v-if="isFullscreen" />
            <icon-fullscreen v-else />
          </template>
        </a-button>
      </a-tooltip>
    </li>
    <!-- <li>
      <a-tooltip content="页面配置">
        <a-button
          class="nav-btn"
          type="outline"
          :shape="'circle'"
          @click="setVisible"
        >
          <template #icon>
            <icon-settings />
          </template>
        </a-button>
      </a-tooltip>
    </li> -->
    <li>
      <a-dropdown trigger="hover">
        <div>
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img
              alt="avatar"
              :src="pimg"
            />
          </a-avatar>
          <span>{{ username }}</span>
        </div>

        <template #content>
          <UserPanel></UserPanel>
        </template>
      </a-dropdown>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { Message } from "@arco-design/web-vue"
import { useDark, useToggle, useFullscreen, BasicColorSchema } from "@vueuse/core"
import { useAppStore, useUserStore } from "@/store"
import useUser from "@/hooks/user"
import MessageBox from "../../../message-box/index.vue"
import UserPanel from "../user-panel/user-panel.vue"
import { doLogout } from "sso-login-logic"
import { getCurrentSystemList } from "@/router/system"
import { useRefState } from "@/hooks/state"
import { useRouter, useRoute } from "vue-router"
import { LinkList } from "./linkConfig"
import { getAppHref } from "@/utils/url"
import { openWindow } from "@/utils"
import pimg from "../../../../assets/images/robot-br.png"

const appStore = useAppStore()
const userStore = useUserStore()
const { logout } = useUser()
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
const avatar = computed(() => {
  return userStore.userInfo.avatarUrl
})
const router = useRouter()
const route = useRoute()
const systemList = getCurrentSystemList()
const [select, , setSelectWatch] = useRefState("")
setSelectWatch((val) => {
  if (val) {
    router.push({
      path: val
    })
  }
})
const username = computed(() => {
  return userStore.userInfo.nickname
})
const theme = computed(() => {
  return appStore.theme
})
let isDark
if(route.meta.theme) { // 固定主题样式
  isDark = useDark({
    selector: "body",
    attribute: "arco-theme",
    initialValue: route.meta.theme as BasicColorSchema,
    valueDark: "dark",
    valueLight: "light",
    storageKey: "arco-theme",
    onChanged(isDark: boolean) {
      // overridden default behavior
      isDark = route.meta.theme === "dark"
      appStore.toggleTheme(isDark)
    }
  })
} else {
  isDark = useDark({
    selector: "body",
    attribute: "arco-theme",
    initialValue: appStore.theme as BasicColorSchema,
    valueDark: "dark",
    valueLight: "light",
    storageKey: "arco-theme",
    onChanged(isDark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(isDark)
    }
  })
}
const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => {
  toggleTheme()
}
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true })
}
const refBtn = ref()
const setPopoverVisible = () => {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  })
  refBtn.value.dispatchEvent(event)
}

const handleSelect = (url) => {
  url && openWindow(url)
}

const openPt = () => {
  const url = getAppHref("twin", "app-twin")
  url && openWindow(url)
}
</script>

<style scoped lang="less">
.r {
  padding-right: 20px;
}
.right-side {
  display: flex;
  list-style: none;
  color: var(--color-text-1);
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
.logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 24px;
  background: #1e5dff;
  border-radius: 4px;
  cursor: pointer;
  .pt-logo {
    width: 20px;
    height: 20px;
  }
}
</style>
