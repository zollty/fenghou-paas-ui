import { openWindow } from "@/utils"
import { ref } from "vue"

export default () => {
  const btnList = ref([
    {
      name: "服务支持：伯通",
      color: "#67C23A",
      clickFn: () => {}
    },
    {
      name: "在线支持(1338712239)",
      color: "#1890ff",
      clickFn: () => {}
    },
    {
      name: "需求征集",
      color: "#F56C6C",
      clickFn: () => {}
    },
    {
      name: "意见反馈",
      color: "#909399",
      clickFn: () => {}
    },
    {
      name: "赞赏",
      color: "#FF8a10",
      clickFn: () => {}
    }
  ])
  const technologyData = ref([
    {
      name: "LLM算法模型",
      frame: "ChatGLM3、Qwen、Baichuan2、Chinese-LLaMA2...",
      link: "https://github.com/THUDM/ChatGLM3"
    },
    {
      name: "Embedding模型",
      frame: "BAAI-BGE、BCEmbedding、M3E、text2vec...",
      link: "https://github.com/netease-youdao/BCEmbedding"
    },
    {
      name: "向量库",
      frame: "faais、milvus、pg、es、chroma",
      link: "https://github.com/facebookresearch/faiss"
    },
    {
      name: "开发框架",
      frame: "langchain、fastapi、langchain-chat",
      link: "https://python.langchain.com/docs/"
    },
    {
      name: "模型优化",
      frame: "auto-gptq、vllm、flash attention 2、safetensors..",
      link: "https://github.com/Dao-AILab/flash-attention"
    },
    {
      name: "模型训练",
      frame: "peft、accelerate、LLaMA Board..",
      link: "https://github.com/huggingface/peft"
    },
    {
      name: "模型管理",
      frame: "huggingface、modelscope、fschat",
      link: "https://www.modelscope.cn/docs/"
    },
    {
      name: "文档处理",
      frame: "PyMuPDF、pypandoc、python-pptx、rapidocr、xlrd...",
      link: "https://zhuanlan.zhihu.com/p/542032660"
    },
    {
      name: "Web服务",
      frame: "uvicorn、python request",
      link: "https://zhuanlan.zhihu.com/p/115237857"
    },
    {
      name: "前端框架",
      frame: "gradio、streamlit、vue-next3",
      link: "https://docs.streamlit.io/"
    },
    {
      name: "第三方组件",
      frame: "duck search、bing search，yuque、weather...",
      link: "https://github.com/duckduckgo/duckduckgo"
    }
  ])
  const tableColumns = [
    { title: "技术栈", dataIndex: "name" },
    { title: "框架", dataIndex: "frame" },
    { title: "链接", dataIndex: "link", slotName: "link" }
  ]
  const openLink = (url: string) => {
    openWindow(url)
  }
  return {
    btnList,
    technologyData,
    tableColumns,
    openLink
  }
}
