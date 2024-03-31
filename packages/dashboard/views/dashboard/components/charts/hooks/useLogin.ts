/**登录统计 */
import { computed, ref } from "vue"
import { ChartBarData, getBarChartOption } from "../config"


export default () => {
    const loginData = ref<ChartBarData>({
        xAxis: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        yAxis:[852,145,485,254,965,420,150,352,654,147,20,542]
    })
    const barChartOption = computed(() => getBarChartOption(loginData.value))
    return {
        barChartOption
    }
}