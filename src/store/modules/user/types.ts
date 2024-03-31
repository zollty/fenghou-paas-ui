export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  /** 账号 */
  account?: string
  /** 头像 */
  avatarUrl?: string
  /** 邮箱 */
  email?: string
  /** 语言 */
  language?: string
  /** 登录时间 */
  loginTime?: string
  /** 手机号 */
  mobile?: string
  /** 昵称 */
  nickname?: string
  /** 所属组织机构 */
  orgs?: string[]
  /** 角色 */
  roles?: string[]
  /** 性别 */
  sex?: number
  /** token */
  ssoToken?: string
  /** 系统ID */
  systemId?: string
}

export interface UserStore {
  user: UserState
}
