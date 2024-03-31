<template>
  <div class="container">
    <Breadcrumb />
    <div class="wrapper">
      <a-result
        class="result"
        status="success"
        :title="'提交成功'"
        :subtitle="'表单提交成功！'"
      >
        <template #extra>
          <a-space class="operation-wrap" :size="16">
            <a-button key="again" type="secondary">
              {{ '打印结果' }}
            </a-button>
            <a-button key="back" type="primary">
              {{ '返回项目列表' }}
            </a-button>
          </a-space>
        </template>
      </a-result>

      <div class="steps-wrapper">
       <!--  <a-typography-paragraph bold>{{
          $t("success.result.progress")
        }}</a-typography-paragraph>
        <a-steps type="dot" :current="2">
          <a-step :title="$t('success.submitApplication')" description="2020/10/10 14:00:39" />
          <a-step :title="$t('success.leaderReview')" :description="$t('success.processing')" />
          <a-step :title="$t('success.purchaseCertificate')" :description="$t('success.waiting')" />
          <a-step :title="$t('success.safetyTest')" :description="$t('success.waiting')" />
          <a-step :title="$t('success.launched')" :description="$t('success.waiting')" />
        </a-steps> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: "Success"
}
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
.wrapper {
  padding: 24px 150px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.result {
  margin: 150px 0 0 0;
}

.operation-wrap {
  margin-bottom: 40px;
  text-align: center;
}

.steps-wrapper {
  width: 100%;
  min-width: fit-content;
  margin-bottom: 150px;
  padding: 20px;
}
</style>

<style lang="less" scoped>
.mobile {
  .wrapper {
    padding: 24px 10px;
    .steps-wrapper {
      transform: scale(0.8);
    }
  }
}
</style>
