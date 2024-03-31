<template>
  <div class="test">
    <img
      class="fx-banner"
      :src="fhImg"
    />
    <h1 class="f0">
      风后AI® 企业私有中文大模型平台
    </h1>
    <div class="intro">
      打造生产力和生活工具，如此轻松
      <ul style="line-height: 24px;">
        <li>更低的成本</li>
        <li>完全本地调用，数据安全保障</li>
        <li>快速开发交付</li>
        <li>灵活应用大模型周边技术</li>
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
import fhImg from "../../assets/img/fenghou_banner_bg00.png"

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

}
</style>
