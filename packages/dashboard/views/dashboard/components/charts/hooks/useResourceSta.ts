/**资源数量统计 */

import { computed, ref } from "vue"
import { getLineChartOption, LineChartData } from "../config"

export default () => {
    const lineChartData= ref<LineChartData>({
        xAxis:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        dataTable:[245,265,289,354,321,340,359,380,420,520,411,422],
        graphic:[123,256,234,199,145,188,352,125,255,158,321,299],
        file:[256,354,365,524,425,356,398,352,521,300,256,563]
    })
    const lineChartOption = computed(() => getLineChartOption(lineChartData.value))
    return {
        lineChartOption
    }
}