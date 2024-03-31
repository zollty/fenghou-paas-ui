import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

const FORM: AppRouteRecordRaw = {
  path: "/index",
  name: "index",
  component: DEFAULT_LAYOUT,
  meta: {
    menuName: "首页",
    icon: "param-icon-bns_all-menu",
    requiresAuth: true,
    order: 1
  },
  children: [
    {
      path: "/kanban",
      name: "kanban",
      component: () => import("../../views/dashboard/dashboard.vue"),
      meta: {
        menuName: "首页看板",
        requiresAuth: true,
        theme: "light",
        icon:"icon-dashboard",
        roles: ["*"],
        order: 1
      }
    },
    {
      path: "/intro",
      name: "intro",
      component: () => import("/packages/llm/views/intro/intro.vue"),
      meta: {
        menuName: "基础介绍",
        theme: "light",
        icon: "icon-file",
        requiresAuth: true,
        roles: ["*"],
        order: 2
      }
    }
  ]
}

export default FORM
