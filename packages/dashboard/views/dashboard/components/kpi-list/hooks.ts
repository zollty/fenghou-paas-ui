import { ref } from "vue"
import appImg from "../../../../assets/imgs/app.png"
import sceneImg from "../../../../assets/imgs/scene.png"
import thematicImg from "../../../../assets/imgs/thematic.png"
import dataTableImg from "../../../../assets/imgs/dataTable.png"
import fileImg from "../../../../assets/imgs/file.png"
import visitImg from "../../../../assets/imgs/visit.png"
import serviceImg from "../../../../assets/imgs/service.png"
import userImg from "../../../../assets/imgs/user.png"
import graphicImg from "../../../../assets/imgs/graphic.png"

interface IkpiItem {
  name: string
  key: string
  value: string | number
  img: string
}

export default () => {
  /**指标列表列表 */
  const KpiListData = ref<IkpiItem[]>([
    {
      name: "用户总数",
      key: "user",
      value: 6,
      img:userImg
    },
    {
      name: "接口数量",
      key: "dataTable",
      value: 32,
      img:dataTableImg
    },
    {
      name: "内置工具数量",
      key: "graphic",
      value: 8,
      img:graphicImg
    },
    {
      name: "接入应用数",
      key: "app",
      value: 12,
      img:appImg
    },
    {
      name: "知识库数量",
      key: "scene",
      value: 5,
      img:sceneImg
    },
    {
      name: "文件总数量",
      key: "file",
      value: 57,
      img:fileImg
    },
    {
      name: "本地LLM模型数量",
      key: "thematic",
      value: 18,
      img:thematicImg
    },
    {
      name: "今日访问数",
      key: "visit",
      value: 514,
      img:visitImg
    },
    {
      name: "服务调用总数",
      key: "service",
      value: 1336,
      img:serviceImg
    }
    
  ])
  return {
    KpiListData
  }
}
