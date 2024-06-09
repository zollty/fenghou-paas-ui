import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

//roles: ["http://172.16.8.91:7760", "", "*"]
//roles: ["http://zollty.com/tools/json.html", "", "*"]
const FORM: AppRouteRecordRaw[] = [
  {
    path: "/svc",
    name: "ksdk7sd",
    component: DEFAULT_LAYOUT,
    meta: {
      menuName: "服务管理",
      icon: "param-icon-bns_Land-use-management",
      requiresAuth: true,
      order: 0
    },
    children: [
      // {
      //   path: "intro",
      //   name: "intro",
      //   component: () => import("../../views/intro/intro.vue"),
      //   meta: {
      //     menuName: "基础介绍",
      //     icon: "icon-apps",
      //     requiresAuth: true,
      //     hideInMenu: false,
      //     order: 4
      //   }
      // },
      {
        path: "nkbmanage",
        name: "nkbmanage",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "知识库管理",
          icon: "param-icon-bns_logs",
          requiresAuth: true,
          hideInMenu: false,
          order: 4,
          roles: ["http://172.16.8.91:9990/knowledge?auth=ImIwYjRiMmMwMGEyMjExZWZiY2VmMDI0MmFjMTUwMDA0Ig.ZjZGPg.w9-e6h-84RKglIazupVzEhPffbY", "", "*"]
        }
      },
      {
        path: "nfilemanage",
        name: "nfilemanage",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "文件管理",
          icon: "param-icon-bns_findfile-searchfile",
          requiresAuth: true,
          hideInMenu: false,
          order: 6,
          roles: ["http://172.16.8.91:9990/file?auth=ImIwYjRiMmMwMGEyMjExZWZiY2VmMDI0MmFjMTUwMDA0Ig.ZjZGPg.w9-e6h-84RKglIazupVzEhPffbY", "", "*"]
        }
      },
      {
        path: "modelmg",
        name: "modelmg",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "LLM模型管理",
          icon: "param-icon-bns_Positioning",
          requiresAuth: true,
          ignoreCache: true,
          order: 8,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fmodelpt", "", "*"]
        }
      },{
        path: "modelcfg",
        name: "modelcfg",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "LLM模型配置",
          icon: "param-icon-bns_Proportion",
          requiresAuth: true,
          ignoreCache: true,
          order: 12,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fmodelmg", "", "*"]
        }
      },{
        path: "embeddingsmg",
        name: "embeddingsmg",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "嵌入模型管理",
          icon: "param-icon-bns_file-information",
          requiresAuth: true,
          hideInMenu: false,
          order: 16,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fmodelpt", "", "*"]
        }
      },{
        path: "promptstmpl",
        name: "promptstmpl",
        component: () => import("../../views/prompt-tmpl.vue"),
        meta: {
          menuName: "提示词专业模板",
          icon: "param-icon-bns_archives2",
          requiresAuth: true,
          hideInMenu: false,
          order: 20,
          roles: ["http://172.16.8.91:8501/404", "", "*"]
        }
      },{
        path: "promptseg",
        name: "promptseg",
        component: () => import("../../views/prompt-lg.vue"),
        meta: {
          menuName: "提示词灵感示例",
          icon: "param-icon-bns_paperplanet",
          requiresAuth: true,
          hideInMenu: false,
          order: 24,
          roles: ["http://172.16.8.91:8501/500", "", "*"]
        }
      },{
        path: "kbmanage",
        name: "kbmanage",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "旧版知识库",
          icon: "param-icon-bns_logs",
          requiresAuth: true,
          hideInMenu: false,
          order: 28,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fkbmg", "", "*"]
        }
      },{
        path: "kbconfig",
        name: "kbconfig",
        component: () => import("../../views/kb-config.vue"),
        meta: {
          menuName: "知识库配置",
          icon: "param-icon-bns_pick-sound",
          requiresAuth: true,
          hideInMenu: false,
          order: 32,
          roles: ["http://172.16.8.91:8501/404", "", "*"]
        }
      },{
        path: "skillplugins",
        name: "skillplugins",
        component: () => import("../../views/plugin-mg.vue"),
        meta: {
          menuName: "插件管理",
          icon: "param-icon-bns_balance",
          requiresAuth: true,
          hideInMenu: false,
          order: 36,
          roles: ["http://172.16.8.91:8501/402", "", "*"]
        }
      },{
        path: "llmtrain",
        name: "llmtrain",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "LLM-训练",
          icon: "param-icon-bns_Sandstorm-Weather",
          requiresAuth: true,
          hideInMenu: false,
          order: 40,
          roles: ["http://172.16.8.91:7760", "", "*"]
        }
      },{
        path: "llmtraindata",
        name: "llmtraindata",
        component: () => import("../../views/train-datamg.vue"),
        meta: {
          menuName: "训练数据管理",
          icon: "param-icon-bns_Scenicspots",
          requiresAuth: true,
          hideInMenu: false,
          order: 44,
          roles: ["http://172.16.8.91:7760", "", "*"]
        }
      }
    ]},
  {
    path: "/skill",
    name: "kjsdk78",
    component: DEFAULT_LAYOUT,
    meta: {
      menuName: "能力集合",
      icon: "param-icon-bns_app-project-content",
      requiresAuth: true,
      order: 4
    },
    children: [
      {
        path: "fcweather",
        name: "functioncall",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "查天气-T",
          icon: "param-icon-bns_Sandstorm-Weather",
          requiresAuth: true,
          hideInMenu: false,
          order: 1,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fskwea", "", "*"]
        }
      },{
        path: "searcheg",
        name: "searcheg",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "联网搜索-T",
          icon: "param-icon-bns_Sifting",
          requiresAuth: true,
          hideInMenu: false,
          order: 8,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fskshd", "", "*"]
        }
      },{
        path: "fcmathcomp",
        name: "fcmathcomp",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "数学计算-T",
          icon: "param-icon-bns_Sculpture2",
          requiresAuth: true,
          hideInMenu: false,
          order: 9,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fskcalc", "", "*"]
        }
      },{
        path: "fcshell",
        name: "functioncall3",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "SHELL命令-T",
          icon: "param-icon-bns_Snow-Weather",
          requiresAuth: true,
          hideInMenu: false,
          order: 12,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fskshell", "", "*"]
        }
      },{
        path: "fcpaper",
        name: "fcpaper",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "查论文-T",
          icon: "param-icon-bns_Statistical-analysis",
          requiresAuth: true,
          hideInMenu: false,
          order: 16,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fskarxiv", "", "*"]
        }
      },{
        path: "fcsentcomp",
        name: "fcsentcomp",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "科学计算-T",
          icon: "param-icon-bns_Sculpture2",
          requiresAuth: true,
          hideInMenu: false,
          order: 18,
          roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fskwolf", "", "*"]
        }
      },{
        path: "codegen",
        name: "codegen",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "强化代码编程",
          icon: "param-icon-bns_Seeding",
          requiresAuth: true,
          hideInMenu: false,
          order: 22,
          roles: ["http://172.16.8.91:7770/code", "", "*"]
        }
      },{
        path: "complexagent",
        name: "complexagent",
        component: () => import("@/views/iframe.vue"),
        meta: {
          menuName: "综合Agent示例",
          icon: "param-icon-bns_Statistical-analysis2",
          requiresAuth: true,
          hideInMenu: false,
          order: 24,
          roles: ["http://172.16.8.91:7760", "", "*"]
        }
      }
    ]},
  {
    path: "/flow",
    name: "ksdjhds843",
    component: DEFAULT_LAYOUT,
    meta: {
      menuName: "自定义工作流",
      icon: "param-icon-bns_aspeed",
      requiresAuth: true,
      order: 8
    },
    children: [
      {
        path: "diyagent",
        name: "diyagent",
        component: () => import("../../views/custom-agent.vue"),
        meta: {
          menuName: "自定义Agent",
          icon: "param-icon-bns_backstage",
          requiresAuth: true,
          hideInMenu: false,
          order: 1,
          roles: ["http://172.16.8.91:7770/tool", "", "*"]
        }
      },{
        path: "diyagentmg",
        name: "diyagentmg",
        component: () => import("../../views/custom-agentmg.vue"),
        meta: {
          menuName: "自定义Agent管理",
          icon: "param-icon-bns_backstage-computer-product",
          requiresAuth: true,
          hideInMenu: false,
          order: 4,
          roles: ["http://172.16.8.91:7770/code", "", "*"]
        }
      }
    ]}
]

export default FORM
