import api, { _fetchExport } from "./createdApi"
import { DefaultPageParams, DefaultPageReturns } from "./createdApi/common"
const PATH = "sysmgmt"

/**用户信息 */
export interface UserInfo {
  /**
   * 账户状态：1正常，2已锁定
   */
  accountStatus?: number
  /**
   * 年龄
   */
  age?: number
  /**
   * 头像地址
   */
  avatar?: string
  /**
   * 用户唯一标识
   */
  bid?: string
  /**
   * 电子邮件
   */
  email?: string
  /**
   * id
   */
  id?: number
  /**
   * 姓名
   */
  nickname?: string
  /**
   * 所属组织机构
   */
  orgCode?: string
  /**
   * 所属组织机构名称
   */
  orgName?: string
  /**
   * 角色名称
   */
  roleNameList?: string[]
  /**
   * 性别：1男，2女，3其他
   */
  sex?: number
  /**
   * 用户状态：1正常，2冻结
   */
  status?: number
  /**
   * 手机号码
   */
  telephone?: string
  /**
   * 租户编码
   */
  tenantCode?: string
  /**
   * 租户名称
   */
  tenantName?: string
  /**
   * 翻译结果Map
   */
  transMap?: { [key: string]: any }
  /**
   * 用户类型，1租户主账户，2一般租户账户
   */
  type?: number
  /**
   * 用户属性扩展数据
   */
  userAttrExtDataVos?: TUserAttrEXTDataVo[]
  /**
   * 用户名称
   */
  username?: string
}
/**
 * 用户属性扩展数据
 */
export interface TUserAttrEXTDataVo {
  /**
   * 扩展字段
   */
  field?: string
  /**
   * 扩展字段名称
   */
  fieldName?: string
  /**
   * 扩展字段类型
   */
  fieldType?: string
  /**
   * 扩展字段取值
   */
  fieldValue?: string
  /**
   * 用户属性扩展数据id
   */
  id?: number
  /**
   * 是否必填1：是，0：否
   */
  required?: number
}
/**获取登录用户信息 */
export const getUserInfo = () => {
  return api.get<UserInfo>(PATH + "/personal/get")
}
/**修改用户信息 */
export const updatePersonal = (params: UserInfo) => {
  return api.post<boolean>(PATH + "/personal/update", params)
}

/**组织机构树形数据 */
export interface TOrganizationParamDto {
  childrens?: TOrganizationParamDto[]
  /**
   * 组织机构编码
   */
  orgCode?: string
  /**
   * 组织机构名称
   */
  orgName?: string
  /**
   * 父级组织机构
   */
  parentCode?: string
}

/**获取组织机构树形数据 */
export const getOrganization = () => {
  return api.post<TOrganizationParamDto[]>(PATH + "/tOrganization/treeList")
}

/**@params 查询登陆日志-分页查询*/
export interface LogLoginGetParams extends DefaultPageParams {
  endDate?: string
  ip?: string
  startDate?: string
  username?: string
  logType?: 1 | 2
  dateRange?: string[]
}

/**登录日志 */
export interface LoginLog {
  /**
   * 应用编码
   */
  appCode?: string
  /**
   * 应用名称
   */
  appName?: string
  /**
   * 客户端代理
   */
  clientAgent?: string
  /**
   * 客户端IP
   */
  clientIp?: string
  /**
   * 客户端名称
   */
  clientName?: string
  /**
   * 客户端系统
   */
  clientSystem?: string
  /**
   * 客户端类型
   */
  clientType?: string
  /**
   * 客户端版本号
   */
  clientVersion?: string
  /**
   * 日志内容
   */
  content?: string
  /**
   * 创建人
   */
  createBy?: string
  /**
   * 创建人id
   */
  createId?: number
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 主键
   */
  id?: number
  /**
   * 日志类型，1登陆，2操作
   */
  logType?: number
  /**
   * 操作时间
   */
  operationDatetime?: string
  /**
   * 操作模块, 如：角色管理
   */
  operationModule?: string
  /**
   * 操作名称，如：保存角色及权限，修改角色的权限
   */
  operationName?: string
  /**
   * 操作结果
   */
  operationResult?: string
  /**
   * 操作类型,1查询，2添加，3更新，4删除
   */
  operationType?: number
  /**
   * 操作人姓名
   */
  operationUser?: string
  /**
   * 操作人用户名
   */
  operationUsername?: string
  /**
   * 所属组织机构编码
   */
  orgCode?: string
  /**
   * 所属组织机构名称
   */
  orgName?: string
  /**
   * 请求参数
   */
  requestArgs?: string
  /**
   * 请求耗时
   */
  requestCost?: number
  /**
   * 请求处理方法
   */
  requestHandleMethod?: string
  /**
   * 请求头
   */
  requestHeader?: string
  /**
   * 请求方法
   */
  requestMethod?: string
  /**
   * 请求url地址
   */
  requestUrl?: string
  /**
   * 操作结果，1成功或者0失败
   */
  resultType?: number
  /**
   * 租户编码
   */
  tenantCode?: string
  /**
   * 更新时间
   */
  updateTime?: Date
}
export interface LogSta {
  count:number
  date: string
}

/**查询登陆日志-分页查询 */
export const loginLogPageGet = (params: LogLoginGetParams) => {
  return api.get<DefaultPageReturns<LoginLog>>(PATH + "/api/log/login", params)
}
/**获取登录日志统计 */
export const loginLogStaGet = (params: LogLoginGetParams) => {
  return api.get<LogSta[]>(PATH + "/api/log/loginLogCountByDays", params)
}
/**导出登录日志 */
export const loginLogExport = (
  params: LogLoginGetParams,
  fileName = "登录日志"
) => {
  // return api.export(
  //   {
  //     url: PATH + "/api/log/login/export",
  //     params
  //   },
  //   "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   fileName
  // )
  api.fetchExport({
    url:PATH +'/api/log/login/export',
    params,
    fileName
  })
  // fetch(
  //   "http://sit-app.paramst.cn/sysmgmt/api/log/login/export?page=1&pageSize=1000&username=root&startDate=2023-03-06+17:17:13&endDate=2023-03-07+17:17:13",
  //   {
  //     headers: {
  //       accept: "application/json, text/plain, */*",
  //       "accept-language": "zh-CN,zh;q=0.9",
  //       "cache-control": "no-cache",
  //       pragma: "no-cache",
  //       satoken: "a_1-38033413607z39-eyimma",
  //       "x-app-code": "BJXCZHGLPT"
  //     },
  //     referrer: "http://localhost:9559/",
  //     referrerPolicy: "strict-origin-when-cross-origin",
  //     body: null,
  //     method: "GET",
  //     mode: "cors",
  //     credentials: "omit"
  //   }
  // ).then(async res=> {
  //   console.log('dowunload-res',await res.blob())
  // })
}

/**@params 查询操作日志-分页查询 */
export interface LogQueryByParamPageParams extends DefaultPageParams {
  reqAccount?: string
  reqTimeBegin?: string
  reqTimeEnd?: string
  httpProvider?: string
  apiModule?: string
  apiName?: string
  apiType?: number
  reqClientIp?: string
  resCost?: number
  dateRange?: string[]
}
/**操作日志 */
export interface ApiLog {
  _measurement?: string
  _time?: Date
  /**
   * API操作描述，支持占位符，如：{}退出登录，修改角色{}的权限
   */
  apiDesc?: string
  /**
   * 主键ID
   */
  apiId?: string
  /**
   * API模块, 如：角色管理
   */
  apiModule?: string
  /**
   * API名称，如：保存角色及权限，修改角色的权限
   */
  apiName?: string
  /**
   * 操作类型，1未定义，2查询，3添加，4更新，5删除，6上传，7下载，8综合
   */
  apiType?: string
  /**
   * HTTP请求Body参数,toJSON，只支持POST PUT PATCH且MediaType为json,xml
   */
  httpBody?: string
  /**
   * HTTP内容格式
   */
  httpContentType?: string
  /**
   * http额外信息
   */
  httpExtraInfo?: string
  /**
   * http请求头
   */
  httpHeader?: string
  /**
   * http host
   */
  httpHost?: string
  /**
   * 请求方法
   */
  httpMethod?: string
  /**
   * HTTP请求的文本参数信息,toJSON
   */
  httpParam?: string
  /**
   * 服务方标识，一般为appId
   */
  httpProvider?: string
  /**
   * 请求uri地址
   */
  httpUri?: string
  /**
   * HTTP的user-agent
   */
  httpUserAgent?: string
  /**
   * 日志时间
   */
  logTime?: string
  /**
   * 姓名
   */
  nickname?: string
  /**
   * 组织机构名称
   */
  orgName?: string
  /**
   * 服务方中文名，appCnName
   */
  providerName?: string
  /**
   * 用户名，账号唯一ID
   */
  reqAccount?: string
  /**
   * 客户端编码
   */
  reqClientIp?: string
  /**
   * 操作处理耗时
   */
  resCost?: number
  /**
   * 客户端编码
   */
  resCostLevel?: string
  /**
   * 日志logId
   */
  resLogId?: string
  /**
   * 操作结果描述（1、简单描述：成功-失败，2、自定义描述）
   */
  resResultDesc?: string
  /**
   * 操作结果，1成功或者0失败
   */
  resResultType?: string
}
export const apiTypeMap = new Map([
  ["1", "未定义"],
  ["2", "查询"],
  ["3", "添加"],
  ["4", "更新"],
  ["5", "删除"],
  ["6", "上传"],
  ["7", "下载"],
  ["8", "综合"]
])
export const getApiType = (type: string) => {
  if (!type) return ""
  return apiTypeMap.get(type) || ""
}
/**查询操作日志-分页查询 */
export const LogQueryByParamPageGet = (params: LogQueryByParamPageParams) => {
  return api.get<DefaultPageReturns<ApiLog>>(
    PATH + "/api/log/queryByParam",
    params
  )
}
/**获取登录日志统计 */
export const LogQueryByParamStaGet = (params: LogQueryByParamPageParams) => {
  return api.get<LogSta[]>(
    PATH + "/api/log/optionLogCountByDays",
    params
  )
}
/**导出操作日志 */
export const logExportByParam = (
  params: LogQueryByParamPageParams,
  fileName = "操作日志"
) => {
  // return api.export(
  //   {
  //     url: PATH + "/api/log/exportByParam",
  //     params
  //   },
  //   "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   fileName
  // )
  api.fetchExport({
    url:PATH +'/api/log/exportByParam',
    params,
    fileName
  })
}
/**@params 分页查询用户有权限访问的应用 */
export interface AppCenterPageParams extends DefaultPageParams {
  /**
   * 应用类型：1:基础应用，2:CIM+应用（非必传）
   */
  appType?: number
  /**
   * 关键字查询（应用名称模糊查询）
   */
  key?: string
}
/**应用信息 */
export interface AppCenter {
  /**
   * 应用编码
   */
  appCode?: string
  /**
   * 应用id
   */
  appId?: number
  /**
   * 应用名称
   */
  appName?: string
  /**
   * 静态资源地址
   */
  appPath?: string
  /**
   * 应用类型
   */
  appType?: number
  /**
   * 是否已经收藏，1是0否
   */
  collected?: number
  /**
   * 创建人
   */
  createBy?: string
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 是否新窗口:1是0否
   */
  isNewWindow?: number
  /**
   * 图标
   */
  logo?: string
  /**
   * 应用状态：1已启用，0已停用
   */
  status?: number
  /**
   * 翻译结果Map
   */
  transMap?: { [key: string]: any }
  /**
   * 应用链接
   */
  url?: string
  /**
   * 应用唯一标识
   */
  appBid?: string
}
/** 分页查询用户有权限访问的应用*/
export const appCenterPageGet = (params: AppCenterPageParams) => {
  return api.post<DefaultPageReturns<AppCenter>>(
    PATH + "/appCenter/page",
    params
  )
}

/**角色信息 */
export interface RoleInfo {
  /**
   * 角色ID
   */
  id?: number
  /**
   * 角色名称
   */
  name?: string
  /**
   * 角色编码
   */
  roleCode?: string
  /**
   * 是否启用，1是0否
   */
  status?: number
  /**
   * 租户编码
   */
  tenantCode?: string
  /**授权应用 */
  appNames?: string
}
/**查询用户拥有的角色信息 */
export const getUserRoleByUsername = (params: { username: string }) => {
  return api.get<RoleInfo>(
    PATH + "/sys/tenant/user/getUserRole/byUsername",
    params
  )
}

/**应用模块 */
export interface AppModule {
  /**
   * 功能id
   */
  apiModule?: string
  /**
   * 功能名称
   */
  apiNames?: {
    /**
     * 功能模块
     */
    apiId?: number
    /**
     * 功能名称
     */
    apiName?: string
  }[]
}

/**API元信息模块名称查询 */
export const getLogMetaList = (provider: string) => {
  return api.get<AppModule[]>(PATH + "/api/log/meta/list", {
    provider
  })
}

/**获取用户公钥 */
export const getPublicKey = (username?: string) => {
  return api.post<string>(PATH + "/personal/getPublicKey", {
    username
  })
}

/**@params 使用原密码修改密码 */
export interface ChangePasswordParams {
  /**
   * 手机号
   */
  cellphone?: string
  /**
   * 新密码（使用公钥加密）
   */
  newPassword?: string
  /**
   * 旧密码（使用MD5加密）
   */
  oldPassword?: string
  /**
   * 短信验证码
   */
  smsCaptcha?: string
}
/**使用原密码修改密码 */
export const changePassword = (params: ChangePasswordParams) => {
  return api.post<any>(PATH + "/personal/changePassword/byOld", params)
}

/**使用短信验证码修改密码 */
export const changePasswordBySms = (
  params: ChangePasswordParams,
  sessionId: string
) => {
  return api.post<any>(
    PATH + `/personal/changePassword/bySmsCaptcha?sessionId=${sessionId}`,
    params
  )
}

/**@params 获取短信验证码 */
export interface CaptchaSmsGetParams {
  cellphone?: string
  codeCount?: number
  codeType?: string
  sessionId?: string
  template?: string
  useType?: string
}
/**获取短信验证码 */
export const captchaSmsGet = (params: CaptchaSmsGetParams) => {
  return api.get<any>(PATH + `/captcha/sms/get`, params)
}
/**检查个人手机号 */
export const checkPersonalCellphone = (cellphone: string) => {
  return api.post<any>(PATH + `/personal/checkPersonalCellphone`, { cellphone })
}

/**@params 查询用户的菜单权限授权情况 */
export interface PermissionGetParams {
  appId?: string | number
  query?: string
}
/**权限菜单 */
export interface RoleAppPermissionMenuDto {
  /**
   * 应用唯一标识
   */
  appBid?: string
  /**
   * 菜单bid
   */
  bid?: string
  /**
   * 子级菜单
   */
  children?: RoleAppPermissionMenuDto[]
  /**
   * 菜单id
   */
  id?: number
  /**
   * 菜单是否授权给角色：1是0否
   */
  isAuthoredToRole?: number
  /**
   * 菜单名称
   */
  name?: string
  /**
   * 父级菜单唯一标识
   */
  parentBid?: string
  /**
   * 排序
   */
  sort?: number
}
/**查询用户应用菜单权限 */
export const permissionGet = (params: PermissionGetParams) => {
  return api.get<RoleAppPermissionMenuDto[]>(
    PATH + `/sys/tenant/permission/menu/list`,
    params
  )
}
/**@params 查询角色应用菜单权限 */
export interface RolePermissionGetParams {
  /**
   * 应用唯一标识bid
   */
  appBid?: string
  /**
   * 应用编码
   */
  appCode: string
  /**
   * 角色编码
   */
  roleCode: string
}
/**查询角色应用菜单权限 */
export const rolePermissionGet = (params: RolePermissionGetParams) => {
  return api.post<RoleAppPermissionMenuDto[]>(
    PATH + `/roleAppPermission/menu/list`,
    params
  )
}
/**功能组菜单 */
export interface FuncitonGroup {
  /**
   * 功能
   */
  actions?: FunctionItem[]
  /**
   * 功能组bid
   */
  bid?: string
  /**
   * 功能组名称
   */
  name?: string
}
export interface FunctionItem {
  /**
   * 应用bid
   */
  appBid?: string
  /**
   * 应用功能组bid
   */
  appModuleBid?: string
  /**
   * 功能bid
   */
  bid?: string
  /**
   * 授权角色的组织机构类型：1个人，2本部，3本部及子部，4所有部门，5指定
   */
  grantOrgType?: number
  /**
   * 功能id
   */
  id?: number
  /**
   * 功能是否授权给角色：1是0否
   */
  isAuthoredToRole?: number
  /**
   * 是否支持数据权限配置:1是0否
   */
  isDataPerm?: number
  /**
   * 功能名称
   */
  name?: string
  /**
   * 类型为指定5时，指定的组织机构编码
   */
  orgCodes?: string[]
  /**
   * 排序
   */
  sort?: number
}
/**查询用户应用功能权限 */
export const actionListGet = (params: PermissionGetParams) => {
  return api.get<FuncitonGroup[]>(
    PATH + `/sys/tenant/permission/action/list`,
    params
  )
}
/**查询用户应用功能权限 */
export const roleActionListGet = (params: RolePermissionGetParams) => {
  return api.post<FuncitonGroup[]>(
    PATH + `/roleAppPermission/action/list`,
    params
  )
}

/**@params 分页查询角色有权查看的应用 */
export interface TRoleAppPageParams extends DefaultPageParams {
  /**
   * 应用类型
   */
  appType?: number
  /**
   * 应用名称或应用标识，模糊查询
   */
  key?: string
  /**
   * 角色编码
   */
  roleCode: string
  /**
   * 应用状态
   */
  status?: number
}

/**分页查询角色有权查看的应用 */
export const tRoleAppPage = (params: TRoleAppPageParams) => {
  return api.post<DefaultPageReturns<AppCenter>>(
    PATH + `/tRoleApp/page`,
    params
  )
}
