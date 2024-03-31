import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    roles?: string[] // 控制有权访问该页的角色
    requiresAuth: boolean //是否需要登录才能访问当前页面(每个路由都必须声明)
    icon?: string // 图标显示在侧菜单中
    menuName?: string // 菜单名称显示在侧菜单和面包屑中
    hideInMenu?: boolean // 如果为true，则不在侧菜单中显示
    hideChildrenInMenu?: boolean // 如果设置为true，则子菜单不会显示在侧菜单中
    activeMenu?: string // 如果设置名称，菜单将根据您设置的名称高亮显示
    order?: number // 排序路由菜单项。如果设置了key，则该值越高，转发越快
    noAffix?: boolean // 如果设置为true，标记将不会粘贴在标签栏中
    ignoreCache?: boolean //如果设置为true，页面将不会被缓存
    tabBar?: boolean
    componentName?: string //组件名称，用来缓存页面使用，自己填写优先使用的，不填写使用RouteName
  }
}
