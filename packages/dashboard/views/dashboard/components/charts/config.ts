export interface ChartBarData {
  xAxis: string[]
  yAxis: number[]
}
/**获取柱状图配置 */
export const getBarChartOption = (data: ChartBarData) => {
  return {
    tooltip: {
      show: true,
      trigger: "axis",
    },
    toolbox: {
      show: true,
      top: 0,
      feature: {
        saveAsImage: { show: true }
      }
    },
    grid: {
      top: 30,
      left: 40,
      right: 10,
      bottom: 30
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
      {
        type: "value",
        name: "登录/次",
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        },
        axisLine: {
          show: true
        },
        axisTick: {
          show: true
        },
        nameGap: 10
      }
    ],
    series: [
      {
        name: "登录次数",
        type: "bar",
        yAxisIndex: 0,
        data: data.yAxis,
        //柱宽度
        barWidth: 15,
        itemStyle: {
          color: "#72aff9"
        }
      }
    ]
  }
}
export type RoseChartData = {
  name: string
  value: number
}[]
/**获取玫瑰图配置 */
export const getRoseChartOption = (data: RoseChartData) => {
  return {
    legend: {
      top: "0",
      type: "scroll",
      itemWidth: 10
    },
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{b} {c} {d}%"
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     saveAsImage: { show: true }
    //   }
    // },
    series: [
      {
        name: "24小时请求统计",
        type: "pie",
        radius: ["0%", "70%"],
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: {
          borderRadius: 8
        },
        labelLine: {
          length: 0
        },
        label: {
          formatter: "{b} {c} {d}%"
        },
        data: (() => data.sort((a, b) => b.value - a.value))()
      }
    ]
  }
}

export interface LineChartData {
  xAxis: string[]
  dataTable: number[]
  graphic: number[]
  file: number[]
}
/**获取折线图统计 */
export const getLineChartOption = (data: LineChartData) => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    color:["#528e2f", "#aec2fe", "#16fdb2"],
    legend: {
      data: ["PDF", "DOCX", "TXT"]
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show:true
        }
      }
    },
    grid: {
      top: 30,
      left: 40,
      right: 10,
      bottom: 30
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data.xAxis
      }
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        },
        axisLine: {
          show: true
        },
        axisTick: {
          show: true
        },
      }
    ],
    series: [
      {
        name: "PDF",
        type: "line",
        areaStyle: {
          opacity:0.3,
        },
        smooth:true,
        stack: "Total",
        emphasis: {
          focus: "series"
        },
        data: data.dataTable
      },
      {
        name: "DOCX",
        type: "line",
        areaStyle: {
          opacity:0.3,
        },
        smooth:true,
        stack: "Total",
        emphasis: {
          focus: "series"
        },
        data: data.graphic
      },
      {
        name: "TXT",
        type: "line",
        stack: "Total",
        areaStyle: {
          opacity:0.3,
        },
        smooth:true,
        emphasis: {
          focus: "series"
        },
        data: data.file
      }
    ]
  }
}
