export interface DefaultPageParams {
  pageSize?: number
  page?: number
  sortItems?: {
    asc: boolean
    column: string
  }[]
}
export interface DefaultPageReturns<T> {
  /**
   * 当前页码
   */
  page?: number
  /**
   * 每页显示条数，默认 10
   */
  pageSize?: number
  /**
   * 当前页记录
   */
  records?: T[]
  /**
   * 总记录数
   */
  total?: number
  /**
   * 总页数
   */
  totalPages?: number
}
