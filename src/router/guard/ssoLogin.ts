import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/store'
import { doLogin, getToken, getUserInfo, removeToken } from 'sso-login-logic'
import { envVar } from '@/config'

export default function setupSsoLoginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log('toPath', to.path)
    const userStore = useUserStore()
    NProgress.start()
    const res = await doLogin({
      toPath: to.path,
      baseUrl: envVar.VITE_APP_LOGINBASE_URL,
      appCode: envVar.VITE_SERVER_XAppCode,
      tokenKey: envVar.VITE_SERVER_TOKEN_NAME,
      noAuthUrl: envVar.VITE_APP_URL_DOMAIN
    })
    console.log('res', res)
    const { release, user, path } = res as {
      release: any
      user: any
      path: string
    }
    // if (!Object.keys(userStore.userInfo).length) {
    if (!userStore.userInfo.nickname) {
      //没有用户信息
      const users = getUserInfo()
      if (users) {
        userStore.setInfo(JSON.parse(users))
      } else if (user) {
        userStore.setInfo(user)
      } else {
        console.log('没有用户信息22', path)
        let newPath = path
        if (path && path.startsWith('http')) {
          const origin = window.location.origin
          newPath = path.replace(origin, '').replace(window.location.pathname + '#', '')
        }
        console.log('没有用户信息11', newPath)
        removeToken()
        next(newPath as string)
        return false
      }
    }
    if (release) {
      /** 放行并加载权限 */
      /* if (
        userStore.permission.actions.length <= 0 ||
        userStore.permission.menus.length <= 0
      ) {
        userStore.SET_PERMISSION()
        userStore.SET_DIRECTIVE(app)
      } */
      // console.log('55')
      if (user && path) {
        next(path)
      } else {
        next()
      }
      return Promise.resolve(true)
    } else {
      /** ssologin 放行, 跳转登录 */
      if (path.includes('ssologin')) {
        console.log(path)
        if (window.location.href !== path) {
          next(path)
        } else {
          window.location.reload()
        }

        return Promise.resolve(true)
      } else {
        next()
        return Promise.resolve(false)
      }
    }
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
