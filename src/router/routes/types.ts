import { defineComponent } from 'vue'
import type { RouteMeta, NavigationGuard } from 'vue-router'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw {
  /**@description:路由路径 */
  path: string
  /**@description:路由名称 */
  name?: string | symbol
  /**@description:所属系统,不传则为所有系统 */
  system?: string[]
  /**@description:附加信息 */
  meta?: RouteMeta
  /**@description:重定向 */
  redirect?: string
  /**@description:所用组件 */
  component: Component | string
  /**@description:子组件 */
  children?: AppRouteRecordRaw[]
  /**@description:别名 */
  alias?: string | string[]
  /**@description:props参数 */
  props?: Record<string, any>
  beforeEnter?: NavigationGuard | NavigationGuard[]
  /**@description:完整路径 */
  fullPath?: string
}
