import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

//roles: ["http://172.16.8.91:7760", "", "*"]
//roles: ["http://zollty.com/tools/json.html", "", "*"]
const FORM: AppRouteRecordRaw[] = [
  {
    path: "/normal",
    name: "ds78676ds",
    component: DEFAULT_LAYOUT,
    meta: {
      menuName: "常用对话测试",
      icon: "param-icon-bns_appendices-links",
      requiresAuth: true,
      order: 0
    },
    children: [
      {
        path: "fenghou-chat",
        name: "fenghou-chat",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "普通对话",
          icon: "icon-desktop",
          requiresAuth: true,
          hideInMenu: false,
          order: 4,
          roles: ["http://172.16.8.91:8501", "", "*"]
        }
      },{
        path: "fchat",
        name: "fchat",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "文件对话",
          icon: "param-icon-bns_Tree-trunk",
          requiresAuth: true,
          hideInMenu: false,
          order: 8,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Ffchat", "", "*"]
        }
      },{
        path: "fchat3",
        name: "fchat3",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "知识库对话",
          icon: "param-icon-bns_Urban-land-type",
          requiresAuth: true,
          hideInMenu: false,
          order: 12,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fkb", "", "*"]
        }
      },{
        path: "plugin",
        name: "plugin",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "插件对话",
          icon: "param-icon-bns_hygiene-clean",
          requiresAuth: true,
          hideInMenu: false,
          order: 16,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Ftchat", "", "*"]
        }
      },{
        path: "vlchat",
        name: "vlchat",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "视觉理解",
          icon: "param-icon-bns_Snow-Weather",
          requiresAuth: true,
          hideInMenu: false,
          order: 17,
          roles: ["http://172.16.8.91:9006/", "", "*"]
        }
      },{
        path: "fchat13",
        name: "fchat13",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "自定义Agent对话",
          icon: "param-icon-bns_examination",
          requiresAuth: true,
          hideInMenu: false,
          order: 20,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fkb", "", "*"]
        }
      },{
        path: "defaultchat",
        name: "defaultchat",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "前台Chat",
          icon: "param-icon-bns_access-control-door",
          requiresAuth: true,
          hideInMenu: false,
          order: 24,
          roles: ["http://172.16.8.91:7775", "", "*"]
        }
      }
    ]},
  {
    path: "/other",
    name: "uisd87fd",
    component: DEFAULT_LAYOUT,
    meta: {
      menuName: "其他对话测试",
      icon: "param-icon-bns_appendices-links",
      requiresAuth: true,
      order: 2
    },
    children: [
      {
        path: "ybychat",
        name: "ybychat",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "园博园助理",
          icon: "param-icon-bns_analysis",
          requiresAuth: true,
          hideInMenu: false,
          order: 4,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fyby", "", "*"]
        }
      },{
        path: "ybychat2",
        name: "ybychat2",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "园博园助理2",
          icon: "param-icon-bns_Sunny-morning",
          requiresAuth: true,
          hideInMenu: false,
          order: 8,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fybyqa", "", "*"]
        }
      },{
        path: "chatglm3",
        name: "chatglm3",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "普通对话(原生模式)",
          icon: "param-icon-bns_Switching",
          requiresAuth: true,
          hideInMenu: false,
          order: 12,
          roles: ["http://172.16.8.91:7770/chat", "", "*"]
        }
      }
    ]}
]

export default FORM
