import { DEFAULT_LAYOUT } from '@/router/routes/base'
import { AppRouteRecordRaw } from '@/router/routes/types'

const FORM: AppRouteRecordRaw = {
  path: '/test',
  name: '/test',
  component: DEFAULT_LAYOUT,
  meta: {
    menuName: '模板',
    icon: 'icon-lock',
    requiresAuth: true,
    order: 3
  },
  children: [
    {
      path: '/test',
      name: '/test',
      component: () => import('../../views/test/test.vue'),
      meta: {
        menuName: '新建模板',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default FORM
