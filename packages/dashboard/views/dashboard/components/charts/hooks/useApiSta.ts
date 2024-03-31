/**24小时请求统计 */

import { computed, ref } from "vue"
import { getRoseChartOption, RoseChartData } from "../config"

export default () => {
  const apiStaData = ref<RoseChartData>([
    {name:"查询",value:550 },
    {name:"添加",value:226 },
    {name:"更新",value:423 },
    {name:"删除",value:199 },
    {name:"上传",value:223 },
    // {name:'下载',value:153 },
    {name:"综合",value:430 },
  ])
  const roseChartOption = computed(() => getRoseChartOption(apiStaData.value))

  return {
    roseChartOption
  }
}