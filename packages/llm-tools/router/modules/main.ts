import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

//roles: ["http://172.16.8.91:7760", "", "*"]
//roles: ["http://zollty.com/tools/json.html", "", "*"]
const FORM: AppRouteRecordRaw[] = [
  {
    path: "/common",
    name: "iusdidsf897",
    component: DEFAULT_LAYOUT,
    meta: {
      menuName: "通用工具",
      icon: "param-icon-bns_3d-section-cube2",
      requiresAuth: true,
      order: 0
    },
    children: [
      // {
      //   path: "intro",
      //   name: "intro",
      //   component: () => import("../../views/intro/intro.vue"),
      //   meta: {
      //     menuName: "工具说明",
      //     icon: "param-icon-bns_Mechanics",
      //     requiresAuth: true,
      //     hideInMenu: false,
      //     order: 4
      //   }
      // },
      {
        path: "fileparse",
        name: "fileparse",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "文件解析工具",
          icon: "icon-user-group",
          requiresAuth: true,
          ignoreCache: false,
          tabBar: true,
          order: 8,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fftest", "", "*"]
        }
      },{
        path: "urlparse",
        name: "urlparse",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "网页解析工具",
          icon: "icon-cloud",
          requiresAuth: true,
          ignoreCache: false,
          tabBar: true,
          order: 9,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Futest", "", "*"]
        }
      },{
        path: "keyword",
        name: "keyword",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "关键词提取",
          icon: "param-icon-bns_access-control-door",
          requiresAuth: true,
          hideInMenu: false,
          order: 10,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fkeyword", "", "*"]
        }
      },{
        path: "battle",
        name: "battle",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "模型对比",
          icon: "param-icon-bns_Platform-management-system",
          requiresAuth: true,
          hideInMenu: false,
          order: 12,
          roles: ["http://172.16.8.91:7785", "", "*"]
        }
      },{
        path: "txt2audio",
        name: "txt2audio",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "语音合成M",
          icon: "param-icon-bns_arrowhead-VR",
          requiresAuth: true,
          hideInMenu: false,
          order: 13,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fmaudio", "", "*"]
        }
      },{
        path: "txt2audioe",
        name: "txt2audioe",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "语音合成E",
          icon: "param-icon-bns_analysis",
          requiresAuth: true,
          hideInMenu: false,
          order: 14,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Faudio", "", "*"]
        }
      },{
        path: "apidocs",
        name: "apidocs",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "后台API文档",
          theme: "light",
          icon: "param-icon-bns_Occupy-destroy-green",
          requiresAuth: true,
          hideInMenu: false,
          order: 16,
          roles: ["http://172.16.8.91:7862", "", "*"]
        }
      },{
        path: "agentdocs",
        name: "agentdocs",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "AgentAPI文档",
          theme: "light",
          icon: "param-icon-bns_Urban-land-type",
          requiresAuth: true,
          hideInMenu: false,
          order: 17,
          roles: ["http://172.16.8.91:20000/docs", "", "*"]
        }
      },{
        path: "ctldocs",
        name: "ctldocs",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "CtrllerAPI文档",
          theme: "light",
          icon: "param-icon-bns_Sunny-morning",
          requiresAuth: true,
          hideInMenu: false,
          order: 18,
          roles: ["http://172.16.8.91:21001/docs", "", "*"]
        }
      },{
        path: "jsontools",
        name: "jsontools",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "JSON查看工具",
          theme: "light",
          icon: "param-icon-bns_Patrol",
          requiresAuth: true,
          hideInMenu: false,
          order: 20,
          roles: ["http://zollty.com/tools/json.html", "", "*"]
        }
      }
    ]}
]

export default FORM
