import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

const FORM: AppRouteRecordRaw = {
  path: "/plays",
  name: "plays",
  component: DEFAULT_LAYOUT,
  meta: {
    menuName: "Playgroud多开",
    icon: "param-icon-bns_appendices-links",
    requiresAuth: true,
    order: 4
  },
  children: [
    {
      path: "http://172.16.8.91:9559/#/llm-play/normal/fchat",
      name: "fchat",
      component: () => "",
      meta: {
        menuName: "文件对话",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 16,
        roles: ["http://172.16.8.91:8501/?request=GET%3A%2Ffchat", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm-play/normal/fenghou-chat",
      name: "fenghou-chat",
      component: () => "",
      meta: {
        menuName: "普通对话",
        icon: "icon-desktop",
        requiresAuth: true,
        ignoreCache: true,
        order: 18,
        roles: ["http://172.16.8.91:8501", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm-play/other/ybychat",
      name: "ybychat",
      component: () => "",
      meta: {
        menuName: "园博园助理",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 24,
        roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fyby", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm-play/other/ybychat2",
      name: "ybychat2",
      component: () => "",
      meta: {
        menuName: "园博园助理2",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 25,
        roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fybyqa", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm-play/normal/defaultchat",
      component: () => "",
      meta: {
        menuName: "前台Chat",
        icon: "param-icon-bns_access-control-door",
        requiresAuth: true,
        ignoreCache: true,
        order: 32,
        roles: ["http://172.16.8.91:7775", "", "*"]
      }
    }
  ]
}

export default FORM
