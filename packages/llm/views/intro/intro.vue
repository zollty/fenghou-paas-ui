<template>
  <div class="intro">
    <img
      class="fx-banner"
      :src="fhImg"
    />
    <h1 class="f0">
      风后AI® 企业私有中文大模型平台
    </h1>
    <div class="intro_txt">
      打造生产力和生活工具，如此轻松
      <ul style="line-height: 24px;">
        <li>功能丰富，包括市面上常见的各种强大AI能力</li>
        <li>完全免费，不需要购买token，不限token，无限免费使用</li>
        <li>私有部署，无需联网、数据安全</li>
        <li>支持超大容量数据解析和存储，快速构建企业知识库</li>
        <li>中文聊天、理解能力媲美ChatGPT（接近GTP4）</li>
        <li>一键集成和部署，更低的成本，快速开发交付</li>
        <li>灵活应用大模型周边技术，多模态语音图像视频支持</li>
      </ul>
      <div>
        技术文档：<a
          href="https://shudi.yuque.com/ui8qdb/wiki/zazpits33ku7o8h8"
          target="_blank"
        >https://shudi.yuque.com/ui8qdb/wiki/zazpits33ku7o8h8</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import fhImg from "../../assets/img/fh_banner1.png"

</script>

<style scoped lang="less">
.fx-banner {
  width: 100%;
  height: auto;
}
.f0 {
  display: block;
}
.intro {
  color: var(--color-text-2);
}
</style>
