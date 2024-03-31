import { apiTypeMap } from "@/api/userInfo"
import { ColumnProps } from "@/components/param-table/interface"
import { SelectOptionData } from "@arco-design/web-vue"

export const tableColumns: ColumnProps[] = [
  {
    title: "类型",
    dataIndex: "apiType",
    slotName: "apiType",
    align: "center"
  },
  {
    title: "应用",
    dataIndex: "providerName",
    align: "center"
  },
  {
    title: "功能组",
    dataIndex: "apiModule",
    align: "center"
  },
  {
    title: "功能名称",
    dataIndex: "apiName",
    align: "center"
  },
  {
    title: "结果",
    dataIndex: "resResultType",
    slotName: "resResultType",
    align: "center"
  },
  {
    title: "结果描述",
    dataIndex: "resResultDesc",
    slotName: "resResultDesc",
    align: "center"
  },
  {
    title: "IP地址",
    dataIndex: "reqClientIp",
    slotName:"reqClientIp",
    align: "center"
  },
  {
    title: "请求耗时",
    dataIndex: "resCost",
    align: "center"
  },
  {
    title: "操作时间",
    dataIndex: "logTime",
    align: "center"
  }
]

const getApiSelectList = (): SelectOptionData[] =>
  [...apiTypeMap.keys()].map((key) => ({
    label: apiTypeMap.get(key),
    value: key
  }))

export const getSearchColumns = (options: {
  appList: SelectOptionData[]
  moduleList: SelectOptionData[]
  apiList: SelectOptionData[]
}): ColumnProps[] => {
  console.log("--------compute-----------------")
  console.log(options)
  return [
    {
      title: "选择应用",
      search: {
        el: "a-select",
        key: "httpProvider",
        props: {
          allowClear: true,
          options: options["appList"]
        }
      }
    },
    {
      title: "功能组",
      search: {
        el: "a-select",
        key: "apiModule",
        props: {
          allowClear: true,
          options: options["moduleList"]
        }
      }
    },
    {
      title: "功能名称",
      search: {
        el: "a-select",
        key: "apiId",
        props: {
          allowClear: true,
          options: options["apiList"]
        }
      }
    },
    {
      title: "操作类型",
      search: {
        el: "a-select",
        key: "apiType",
        props: {
          allowClear: true,
          options: getApiSelectList()
        }
      }
    },
    {
      title: "日期范围",
      search: {
        el: "a-range-picker",
        key: "dateRange",
        props: {
          showTime: true
        },
        span: 2
      }
    },
    {
      title: "IP地址",
      search: {
        el: "a-input",
        key: "reqClientIp"
      }
    },
    {
      title: "操作耗时",
      search: {
        el: "a-input-number",
        key: "resCost"
      }
    }
  ]
}