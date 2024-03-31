<template>
  <div class="my-authority">
    <div class="left-menu">
      <a-button
        class="app-item"
        v-for="i in appList"
        :key="i.appId"
        shape="round"
        :type="i.appId === currentApp.appId ? 'primary' : 'secondary'"
        @click="changeCurrentApp(i)"
        >{{ i.appName }}</a-button
      >
    </div>
    <div class="right-content">
      <a-tabs default-active-key="resources" lazy-load>
        <a-tab-pane key="resources" title="菜单">
          <div class="header-search">
            <div class="search-single">
              <a-input-search
                v-model="params.query"
                placeholder="请输入关键字查询"
                allow-clear
                @search="dealSearch(0)"
                @change="dealSearch(0)"
                @clear="clearSearch(0)"
              />
            </div>
          </div>
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
          <div class="header-search">
            <div class="search-single">
              <a-input-search
                v-model="params.query"
                placeholder="请输入关键字查询"
                allow-clear
                @search="dealSearch(1)"
                @change="dealSearch(1)"
                @clear="clearSearch(1)"
              />
            </div>
          </div>
          <a-tree
            class="tree"
            :data="functionList"
            :default-expand-all="false"
            :field-names="{
              key: 'bid',
              title: 'name',
              children: 'actions'
            }"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  actionListGet,
  FuncitonGroup,
  permissionGet,
  PermissionGetParams,
  RoleAppPermissionMenuDto
} from "@/api/userInfo"
import { Message, TreeNodeData } from "@arco-design/web-vue"
import { ref, watch } from "vue"
import useAppList from "./hooks/useAppList"

const { appList, currentApp, changeCurrentApp } = useAppList()
const params = ref<PermissionGetParams>({})

const resourceList = ref<TreeNodeData[]>([])
const getResourceList = async () => {
  const res = await permissionGet(params.value)
  if (!res[1] || !res[1].success) {
    Message.error("获取菜单失败")
    return
  }
  resourceList.value = res[1].data as TreeNodeData[]
}
const functionList = ref<TreeNodeData[]>([])
const getFunctionList = async () => {
  const res = await actionListGet(params.value)
  if (!res[1] || !res[1].success) {
    Message.error("获取功能失败")
    return
  }
  functionList.value = res[1].data as TreeNodeData[]
}
/**关键字查询 type: 0-菜单查询, 1-功能查询 */
const dealSearch = (type: 0 | 1) => {
  type ? getFunctionList() : getResourceList()
}
const clearSearch = (type: 0 | 1) => {
  params.value.query = undefined
  type ? getFunctionList() : getResourceList()
}
watch(
  () => currentApp.value,
  (data) => {
    if (!data || !data.appId) return
    params.value = {
      appId: data.appId
    }
    getResourceList()
    getFunctionList()
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped lang="less">
.my-authority {
  display: flex;
  box-sizing: border-box;
  padding: 0 20px 20px;
}
.right-content {
  max-height: 500px;
  overflow-y: auto;
}
.left-menu {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 500px;
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
.header-search {
  display: flex;
  .search-single {
    width: 200px;
    margin-left: 15px;
  }
  .reset-btn {
    margin: 0 20px;
  }
}
.tree {
  margin-left: 15px;
}
:deep(.arco-tree-node-is-leaf .arco-tree-node-title-text) {
  color: rgb(var(--primary-6));
}
</style>
