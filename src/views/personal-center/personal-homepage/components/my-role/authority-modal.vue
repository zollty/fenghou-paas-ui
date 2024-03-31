<template>
  <div class="my-authority">
    <div class="left-menu">
      <a-button
        class="app-item"
        v-for="i in appList"
        :key="i.appBid"
        shape="round"
        :type="
          currentApp && i.appBid === currentApp.appBid ? 'primary' : 'secondary'
        "
        @click="changeCurrentApp(i)"
        >{{ i.appName }}</a-button
      >
    </div>
    <div class="right-content">
      <a-tabs default-active-key="resources" lazy-load>
        <a-tab-pane key="resources" title="菜单">
          <a-tree
            class="tree"
            :data="resourceList"
            :field-names="{
              key: 'bid',
              title: 'name'
            }"
            :default-expand-all="false"
          />
        </a-tab-pane>
        <a-tab-pane key="function" title="功能">
          <a-tree
            class="tree"
            :data="functionList"
            :field-names="{
              key: 'bid',
              title: 'name',
              children: 'actions'
            }"
            :default-expand-all="false"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AppCenter,
  FuncitonGroup,
  roleActionListGet,
  RoleAppPermissionMenuDto,
  RoleInfo,
  rolePermissionGet,
  RolePermissionGetParams
} from "@/api/userInfo"
import { Message, TreeNodeData } from "@arco-design/web-vue"
import { ref, watch, PropType } from "vue"

const props = defineProps({
  role: {
    type: Object as PropType<RoleInfo>,
    default: () => ({} as RoleInfo)
  },
  appList: {
    type: Array as PropType<AppCenter[]>,
    default: () => []
  }
})

const params = ref<RolePermissionGetParams>({
  appBid: "",
  appCode: "",
  roleCode: ""
})

const currentApp = ref<AppCenter>()
const changeCurrentApp = (data: AppCenter) => {
  if (currentApp.value && data.appBid === currentApp.value.appBid) return
  currentApp.value = data
  if (!props.role || !props.role.roleCode) return
  params.value = {
    appBid: data.appBid,
    appCode: data.appCode,
    roleCode: props.role.roleCode
  }
  getResourceList()
  getFunctionList()
}

const resourceList = ref<TreeNodeData[]>([])
const getResourceList = async () => {
  const res = await rolePermissionGet(params.value)
  if (!res[1] || !res[1].success) {
    Message.error("获取菜单失败")
    return
  }
  resourceList.value = res[1].data as TreeNodeData[]
}
const functionList = ref<TreeNodeData[]>([])
const getFunctionList = async () => {
  const res = await roleActionListGet(params.value)
  if (!res[1] || !res[1].success) {
    Message.error("获取功能失败")
    return
  }
  functionList.value = res[1].data as TreeNodeData[]
}
watch(
  [() => props.appList, () => props.role],
  (arr) => {
    if (arr[0].length < 1 || !arr[1] || !arr[1].roleCode) return
    changeCurrentApp(arr[0][0])
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped lang="less">
.my-authority {
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.right-content {
  height: 500px;
  overflow-y: auto;
}
.left-menu {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 500px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid var(--color-neutral-3);
  overflow-y: auto;
  .app-item {
    display: block;
    margin-bottom: 10px;
    height: 32px;
    flex-shrink: 0;
  }
}
.right-content {
  flex: 1;
}
.tree {
  margin-left: 15px;
}
:deep(.arco-tree-node-is-leaf .arco-tree-node-title-text) {
  color: rgb(var(--primary-6));
}
</style>
