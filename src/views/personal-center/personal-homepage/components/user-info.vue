<template>
  <div class="user-info">
    <div class="left-img">
      <a-image
        class="header-img"
        :src="userInfo.avatar || ''"
        width="50"
        height="50"
      />
    </div>
    <div class="right-info">
      <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }">
        <a-grid-item v-for="i in infoData" :key="i.key">
          <div class="info-item">
            <span class="label">{{ i.label }}:</span>
            <span class="value" v-if="i.key !== 'orgName'">{{
              i.value || ""
            }}</span>
            <template v-else>
              <span class="active-value" @click="handleClickOrg">{{
                i.value || ""
              }}</span>
              <template v-if="showOrg">
                <a-modal v-model:visible="showOrg">
                  <template #title> {{ userInfo.orgName }} </template>
                  <template #footer>
                    <a-button type="primary" @click="showOrg = false"
                      >关闭</a-button
                    >
                  </template>
                  <div class="organization-pancel">
                    <a-tree
                      :data="orgData"
                      :field-names="{
                        key: 'orgCode',
                        title: 'orgName',
                        children: 'childrens'
                      }"
                      :default-expand-all="false"
                      default-expand-selected
                      :default-selected-keys="[userInfo.orgCode || '']"
                    />
                  </div> </a-modal
              ></template>
            </template>
          </div>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getOrganization,
  getUserInfo,
  TOrganizationParamDto,
  UserInfo
} from "@/api/userInfo"
import { Message, TreeNodeData } from "@arco-design/web-vue"
import { ref, PropType, watch } from "vue"
interface InfoItem {
  label: string
  key: string
  value?: string | number
}
const infoData = ref<InfoItem[]>([
  {
    label: "用户名",
    key: "username"
  },
  {
    label: "组织机构",
    key: "orgName"
  },
  {
    label: "手机号",
    key: "telephone"
  },
  {
    label: "邮箱",
    key: "email"
  },
  {
    label: "姓　名",
    key: "nickname"
  },
  {
    label: "性　别",
    key: "sex"
  },
  {
    label: "年　龄",
    key: "age"
  }
])
const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({} as UserInfo)
  }
})

/**是否显示组织机构 */
const showOrg = ref(false)
const orgData = ref<TreeNodeData[]>([])

const handleClickOrg = async () => {
  const res = await getOrganization()
  if (!res[1] || !res[1].success) {
    Message.error("获取组织机构数据失败")
    return
  }
  console.log(res)
  orgData.value = res[1].data as TreeNodeData[]
  showOrg.value = true
}
watch(
  () => props.userInfo,
  () => {
    infoData.value = infoData.value.map((item) => {
      item.value = props.userInfo[item.key] || ""
      if (item.key === "sex") {
        if (item.value) {
          item.value = item.value == "1" ? "男" : "女"
        }
      }
      return item
    })
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  padding: 0 20px;
  align-items: center;
  .left-img {
    margin-right: 50px;
  }
  .right-info {
    flex: 1;
    // display: flex;
    // flex-wrap: wrap;
  }
}
.info-item {
  position: relative;
  // margin: 10px 30px 10px 0;
  margin: 10px 0;
  // width: 25%;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-2);
  .label {
    margin-right: 20px;
  }
  .active-value {
    color: rgb(var(--primary-6));
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.organization-pancel {
  height: 300px;
  overflow: overlay;
}
.header-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
