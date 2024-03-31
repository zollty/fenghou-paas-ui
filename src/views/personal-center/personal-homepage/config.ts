import { ColumnProps } from "@/components/param-table/interface"

export type StaData = { xAxis: string[]; login: number[]; operation: number[] }
export const getLineChartOption = (data: StaData) => {
  const maxSet = getLineSplit(data.login, data.operation)
  return {
    tooltip: {
      show: true,
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.7)",
      borderColor: "rgba(0,0,0,0.7)",
      textStyle: {
        color: "#ffffff"
      }
    },
    color: ["#5171c4", "#a2cb78"],
    legend: {
      show: true,
      textStyle: {
        fontSize: 14
      },
      icon: "roundRect",
      itemWidth: 10,
      itemHeight: 10
    },
    toolbox: {
      show: true,
      top: 0,
      feature: {
        saveAsImage: { show: true }
      }
    },
    xAxis: {
      type: "category",
      data: data.xAxis,
      axisLabel: {
        rotate: 30 //文字倾斜
      },
      nameGap: 30
    },
    yAxis: [
      Object.assign(
        {
          type: "value",
          name: "登录/次",
          min: 0,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#5171c4"
            }
          },
          axisTick: {
            show: true
          },
          nameGap: 30
        },
        maxSet ? maxSet[0] : {}
      ),
      Object.assign(
        {
          type: "value",
          name: "操作/次",
          min: 0,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#a2cb78"
            }
          },
          axisTick: {
            show: true
          },
          nameGap: 30
        },
        maxSet ? maxSet[1] : {}
      )
    ],
    series: [
      {
        name: "登录",
        type: "bar",
        yAxisIndex: 0,
        data: data.login,
        //柱宽度
        barWidth: 15
      },
      {
        name: "操作",
        type: "line",
        yAxisIndex: 1,
        smooth:true,
        data: data.operation
      }
    ]
  }
}

/**获取双y轴分割线配置 */
const getLineSplit = (arr1: number[], arr2: number[], num = 5, integer = 5) => {
  const _arr1 = [...arr1].sort((a, b) => b - a)
  const _arr2 = [...arr2].sort((a, b) => b - a)
  const _max1 = _arr1[0] || 0
  const _max2 = _arr2[0] || 0
  if (_max1 === _max2) return undefined
  const max1 = _max1 + (integer - (_max1 % integer))
  const max2 = _max2 + (integer - (_max2 % integer))
  return [
    { max: max1, interval: max1 / num },
    { max: max2, interval: max2 / num }
  ]
}

export const roleTableColumns: ColumnProps[] = [
  {
    title: "角色名称",
    dataIndex: "name",
    align: "center"
  },

  {
    title: "角色标识",
    dataIndex: "roleCode",
    align: "center"
  },
  {
    title: "角色状态",
    dataIndex: "status",
    slotName: "status",
    align: "center"
  },
  {
    title: "授权应用",
    dataIndex: "appNames",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    slotName: "operation",
    align: "center"
  }
]
