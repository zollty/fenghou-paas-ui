import { defineStore } from 'pinia'
import { UserState, UserStore } from './types'
import { getUserInfo, doLogout, removeToken } from 'sso-login-logic'

const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    user: {
      nickname: undefined,
      avatarUrl: undefined,
      email: undefined,
      roles: []
    }
  }),
  getters: {
    userInfo(state: UserStore): UserState {
      return state.user
    }
  },
  actions: {
    switchRoles() {
      return new Promise(resolve => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },
    setInfo(partial: Partial<UserState>) {
      this.user = partial
    },
    // Reset user's information
    resetInfo() {
      this.$reset()
    },
    login(from: any) {
      console.log(from)
    },
    // Get user's information
    async info() {
      const res = await getUserInfo()
      this.setInfo(JSON.parse(res))
    },
    // Logout
    async logout() {
      removeToken()
      doLogout()
    }
  }
})

export default useUserStore
