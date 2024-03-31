import { ColumnProps } from "@/components/param-table/interface"

export const tableColumns: ColumnProps[] = [
  {
    title: "日志内容",
    dataIndex: "content",
    align: "center"
  },
  {
    title: "IP地址",
    dataIndex: "clientIp",
    align: "center",
    slotName:'clientIp',
  },
  {
    title: "登录时间",
    dataIndex: "operationDatetime",
    align: "center"
  },
  {
    title: "耗时",
    dataIndex: "requestCost",
    align: "center"
  }
]
export const formColumns: ColumnProps[] = [
  {
    title: "时间范围查询",
    isShow: false,
    search: {
      el: "a-range-picker",
      key: "dateRange",
      props: {
        showTime: true,
        // 'disabled-input':true
      }
    }
  }
]
