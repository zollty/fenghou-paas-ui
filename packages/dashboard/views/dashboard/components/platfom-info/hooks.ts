import { ref } from "vue"

interface IinfoData {
  title:string,
  color: string,
  bgColor:string
  content:{
    info:string
    list?:string[]
  }[]
}

export default () => {
  const infoData = ref<IinfoData[]>([
    {
      title: "平台概述",
      color: "#67C23A",
      bgColor:"#f0f9eb",
      content: [
        {
          info: "风后®AI PaaS 是一套专为中小企业快速搭建AI应用的服务平台，可以私有部署，内置开箱即用的常用AI部署和连接能力，集成包括自然语言处理、机器学习、图像识别、语音识别等常用AI技术，涵盖当前最新主流的开源方案及商业方案。中小企业不需要关心AI框架如何选择、部署、接入、实施，只需要提出具体需求，风后AI将给出对应的解决方案及整套PaaS服务平台，主要内容包括开源AI框架的部署或商业AI平台的接入，模型和算法的选择及部署优化，数据预处理和集成，模型测试和验证，模型调整和维护，数据输出处理和应用集成。平台内置市面上常见的各种功能，开箱即用。"
        }
      ]
    },
    {
      title: "产品特点",
      color: "#E6A23C",
      bgColor:"#fdf6ec",
      content: [
        {
          info: "平台自主可控，可私有化，保证安全，集成多模态，包含语言推理LLM、图形、视频、语音等能力。 性能可用、成本可度量可接受（匹配市场）。 封装，打通数据准备-算法模型-算力部署-API调用。终极目标：通过此平台，打造生产力和生活工具，如此轻松！",
          list: [
            "众多媲美ChatGPT的本地大语言模型，无限制使用",
            "众多AI功能，本地一键部署、丰富功能全部解锁",
            "完全本地调用，数据安全保障",
            "企业私有知识库，无限量知识，随时更新",
            "最新最强的开源模型和算法",
            "吸取最新最优技术, 最新成果",
            "灵活应用大模型周边技术",
            "快速部署，快速开发交付"
          ]
        }
      ]
    },
    {
      title: "功能模块",
      color: "#909399",
      bgColor:"#f4f4f5",
      content: [
        {
          info: "",
          list:["AI云计算平台（Docker、GPU）","本地AI模型（数十种）","模型管理平台","模型Agent开发框架","API服务","知识库在线管理","会话及消息管理","辅助训练工具","数据处理工具","存储及缓存库","组件及案例库","Chatbot前端"]
        }
      ]
    }
  ])
  return {
    infoData
  }
}
