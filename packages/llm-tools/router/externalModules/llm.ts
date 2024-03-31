import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

const FORM: AppRouteRecordRaw = {
  path: "/llmm",
  name: "llmm",
  component: DEFAULT_LAYOUT,
  meta: {
    menuName: "服务平台多开",
    icon: "param-icon-bns_Land-use-management",
    requiresAuth: true,
    order: 8
  },
  children: [
    {
      path: "http://172.16.8.91:9559/#/llm/svc/modelmg",
      name: "modelmg",
      component: () => "",
      meta: {
        menuName: "模型在线管理",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 3,
        roles: ["http://172.16.8.91:8501/?request=GET%3A%2Fmodelmg", "", "*"]
      }
    },
    {
      path: "http://172.16.8.91:9559/#/llm/svc/kbmanage",
      name: "kbmanage",
      component: () => "",
      meta: {
        menuName: "知识库管理",
        icon: "param-icon-bns_logs",
        requiresAuth: true,
        ignoreCache: true,
        order: 4,
        roles: ["http://172.16.8.91:8501", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm/svc/functioncall",
      name: "functioncall",
      component: () => "",
      meta: {
        menuName: "工具调用示例",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 8,
        roles: ["http://172.16.8.91:7770/tool", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm/svc/codegen",
      name: "codegen",
      component: () => "",
      meta: {
        menuName: "代码生成示例",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 12,
        roles: ["http://172.16.8.91:7770/code", "", "*"]
      }
    },{
      path: "http://172.16.8.91:9559/#/llm/svc/llmtrain",
      name: "llmtrain",
      component: () => "",
      meta: {
        menuName: "LLM-训练",
        icon: "icon-user-group",
        requiresAuth: true,
        ignoreCache: true,
        order: 48,
        roles: ["http://172.16.8.91:7760", "", "*"]
      }
    }
  ]
}

export default FORM
