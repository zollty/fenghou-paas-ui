import { mock, Random } from "mockjs"

export interface ChartDataRecord {
  x: string
  y: number
  name: string
}
export interface DataChainGrowth {
  quota: string
}

export interface DataChainGrowthRes {
  count: number
  growth: number
  chartData: {
    xAxis: string[]
    data: { name: string; value: number[] }
  }
}
export function queryDataChainGrowth(data: DataChainGrowth) {
  const { quota } = data
  const getLineData = () => {
    return {
      xAxis: new Array(12).fill(0).map((_item, index) => `${index + 1}日`),
      data: {
        name: quota,
        value: new Array(12).fill(0).map(() => Random.natural(1000, 3000))
      }
    }
  }
  return {
    data: {
      count: Random.natural(1000, 3000),
      growth: Random.float(20, 100, 2, 2),
      chartData: getLineData()
    }
  }
}

export interface PopularAuthorRes {
  list: {
    ranking: number
    author: string
    contentCount: number
    clickCount: number
  }[]
}

export async function queryPopularAuthor() {
  const generateData = () => {
    const list = new Array(7).fill(0).map((_item, index) => ({
      ranking: index + 1,
      author: mock("@ctitle(5)"),
      contentCount: mock(/[0-9]{4}/),
      clickCount: mock(/[0-9]{4}/)
    }))
    return {
      list
    }
  }
  return {
    data: {
      ...generateData()
    }
  }
}

export interface ContentPublishRecord {
  x: string[]
  y: number[]
  name: string
}

export async function queryContentPublish() {
  const generateLineData = (name: string) => {
    const result = {
      name,
      x: [] as string[],
      y: [] as number[]
    }
    new Array(12).fill(0).forEach((_item, index) => {
      result.x.push(`${index * 2}:00`)
      result.y.push(Random.natural(1000, 3000))
    })
    return result
  }
  return {
    data: [
      generateLineData("纯文本"),
      generateLineData("图文类"),
      generateLineData("视频类")
    ]
  }
}

export async function queryContentPeriodAnalysis() {
  const getLineData = (name: string) => {
    return {
      name,
      value: new Array(12).fill(0).map(() => Random.natural(30, 90))
    }
  }
  return {
    data: {
      xAxis: new Array(12).fill(0).map((_item, index) => `${index * 2}:00`),
      data: [
        getLineData("纯文本"),
        getLineData("图文类"),
        getLineData("视频类")
      ]
    }
  }
}

export interface PublicOpinionAnalysis {
  quota: string
}
export interface PublicOpinionAnalysisRes {
  count: number
  growth: number
  chartData: ChartDataRecord[]
}
export async function queryPublicOpinionAnalysis(data: DataChainGrowth): Promise<any> {
  const { quota = "visitors" } = data
  if (["visitors", "comment"].includes(quota)) {
    const year = new Date().getFullYear()
    const getLineData = (name: number) => {
      return new Array(12).fill(0).map((_item, index) => ({
        x: `${index + 1}月`,
        y: Random.natural(0, 100),
        name: String(name)
      }))
    }
    return {
      data: {
        count: 5670,
        growth: 206.32,
        chartData: [...getLineData(year), ...getLineData(year - 1)]
      }
    }
  }
  if (["published"].includes(quota)) {
    const year = new Date().getFullYear()
    const getLineData = (name: number) => {
      return new Array(12).fill(0).map((_item, index) => ({
        x: `${index + 1}日`,
        y: Random.natural(20, 100),
        name: String(name)
      }))
    }
    return {
      data: {
        count: 5670,
        growth: 206.32,
        chartData: [...getLineData(year)]
      }
    }
  }
  return {
    data: {
      count: 5670,
      growth: 206.32,
      chartData: [
        // itemStyle for demo
        { name: "文本类", value: 25, itemStyle: { color: "#8D4EDA" } },
        { name: "图文类", value: 35, itemStyle: { color: "#165DFF" } },
        { name: "视频类", value: 40, itemStyle: { color: "#00B2FF" } }
      ]
    }
  }
}
export interface DataOverviewRes {
  xAxis: string[]
  data: Array<{ name: string; value: number[]; count: number }>
}

export async function queryDataOverview() {
  const generateLineData = (name: string) => {
    return {
      name,
      count: Random.natural(20, 2000),
      value: new Array(8).fill(0).map(() => Random.natural(800, 4000))
    }
  }
  const xAxis = new Array(8).fill(0).map((_item, index) => {
    return `12.1${index}`
  })
  return {
    data: {
      xAxis,
      data: [
        generateLineData("内容生产量"),
        generateLineData("内容点击量"),
        generateLineData("内容曝光量"),
        generateLineData("活跃用户数")
      ]
    }
  }
}
