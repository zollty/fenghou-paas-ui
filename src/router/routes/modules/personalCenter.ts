import { DEFAULT_LAYOUT } from "@/router/routes/base"
import { AppRouteRecordRaw } from "@/router/routes/types"

const DASHBOARD: AppRouteRecordRaw = {
  path: "/personal-center",
  name: "personalCenter",
  component: DEFAULT_LAYOUT,
  meta: {
    menuName: "个人中心",
    requiresAuth: true,
    icon: "icon-user",
    order: 99
  },
  children: [
    {
      path: "personal-homepage",
      name: "personalHomepage",
      component: () =>
        import("@/views/personal-center/personal-homepage/index.vue"),
      meta: {
        menuName: "个人主页",
        requiresAuth: true,
        icon: "icon-idcard",
        roles: ["*"]
      }
    },
    {
      path: "personal-setting",
      name: "personalSetting",
      component: () =>
        import("@/views/personal-center/personal-setting/index.vue"),
      meta: {
        menuName: "个人设置",
        icon: "icon-edit",
        requiresAuth: true,
        roles: ["*"]
      }
    },
    {
      path: "login-log",
      name: "personalLoginLog",
      component: () => import("@/views/personal-center/login-log/personalLoginLog.vue"),
      meta: {
        menuName: "登录日志",
        componentName: "personalLoginLog",
        icon: "icon-cloud",
        requiresAuth: true,
        ignoreCache: false,
        tabBar: true,
        roles: ["*"]
      }
    },
    {
      path: "operation-log",
      name: "personalOperationLog",
      component: () =>
        import("@/views/personal-center/operation-log/personalOperationLog.vue"),
      meta: {
        menuName: "操作日志",
        componentName: "personalOperationLog",
        requiresAuth: true,
        ignoreCache: false,
        tabBar: true,
        icon: "param-icon-bns_Data-intelligence-middle-platform",
        roles: ["*"]
      }
    }
  ]
}

export default DASHBOARD
