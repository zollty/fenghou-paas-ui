<template>
  <article class="param-table">
    <!-- 查询表单 card -->
    <SearchForm
      v-if="isShowSearch"
      :search="search"
      :reset="reset"
      :search-param="searchParam"
      :columns="searchColumns"
      :search-col="searchCol"
    />
    <a-divider v-if="isShowSearch" style="margin-top: 0" />
    <div class="table">
      <!-- 表格头部 操作按钮 -->
      <a-row style="margin-bottom: 16px" align="center" v-if="showTableTop">
        <a-col :span="12">
          <a-space>
            <slot
              name="tableHeader"
              :selected-keys="selectedKeys"
              :selected-rows="selectedRows"
            ></slot>
          </a-space>
        </a-col>
        <a-col
          v-if="toolButton"
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip content="斑马纹">
            <a-switch v-model="stripe" size="small" />
          </a-tooltip>
          <a-divider direction="vertical" />
          <a-space>
            <a-tooltip content="刷新">
              <div class="action-icon" @click="getTableList">
                <icon-refresh size="18" />
              </div>
            </a-tooltip>
            <a-dropdown @select="changeDensitySize">
              <a-tooltip content="密度">
                <div class="action-icon"><icon-line-height size="18" /></div>
              </a-tooltip>
              <template #content>
                <a-doption
                  v-for="item in densityState.options"
                  :key="item.value"
                  :value="item.value"
                  :class="{ active: item.value === densityState.size }"
                >
                  <span>{{ item.name }}</span>
                </a-doption>
              </template>
            </a-dropdown>
            <a-tooltip content="列设置">
              <a-popover trigger="click" position="bl">
                <div class="action-icon"><icon-settings size="18" /></div>
                <template #content>
                  <div id="tableSetting">
                    <div
                      v-for="(item, index) in showColumns"
                      :key="item.dataIndex"
                      class="setting"
                    >
                      <div>
                        <a-checkbox
                          v-model="item.checked"
                          @change="handleChange($event, item, index)"
                        >
                        </a-checkbox>
                      </div>
                      <div class="title">
                        {{ item.title === "#" ? "序列号" : item.title }}
                      </div>
                    </div>
                  </div>
                </template>
              </a-popover>
            </a-tooltip>
          </a-space>
        </a-col>
      </a-row>
      <!-- 表格主体 -->
      <a-table
        ref="tableElRef"
        v-bind="$attrs"
        :data="tableData"
        :columns="tableColumns"
        :pagination="false"
        :loading="loading"
        :stripe="stripe"
        :size="densityState.size"
        :selected-keys="selectedKeys"
        :column-resizable="columnResizable"
        @selection-change="selectionChange"
      >
        <template
          v-for="item in Object.keys($slots)"
          #[item]="data"
          :key="item"
        >
          <slot :name="item" v-bind="data"></slot>
        </template>
      </a-table>
      <a-pagination
        v-if="pagination"
        v-model:current="pageable.current"
        v-model:page-size="pageable.pageSize"
        :total="pageable.total"
        show-total
        show-jumper
        show-page-size
        @change="handleCurrentChange"
        @page-size-change="handleSizeChange"
      />
    </div>
  </article>
</template>
<script lang="ts" setup name="ParamTable">
/**
 * 待完成:
 * 字典翻译
 * 其他测试
 * 删除一些不必要的东西
 */
import { TableProps } from "@arco-design/web-vue/es/table/interface"
import { BreakPoint } from "../Grid/interface"
import { ColumnProps } from "./interface"
import SearchForm from "@/components/search-form/searchForm.vue"
import methods from "./methods"
import { DataCallBackReturn } from "./methods/useTable"
import { computed } from "vue"
interface ParamTableProps extends Partial<Omit<TableProps, "data">> {
  /**列配置项==> 必传 **/
  columns: ColumnProps[]
  /**请求表格数据的api ==> 必传 */
  requestApi: (params: any) => Promise<any>
  /**返回数据的回调函数，可以对数据进行处理 ==> 非必传 */
  dataCallback?: (data: any) => DataCallBackReturn
  /**搜索查询前处理查询参数 */
  searchCallBack?: (data: Record<string, any>) => Record<string, any>
  /**是否需要分页组件 ==> 非必传（默认为true） */
  pagination?: boolean
  /**初始化请求参数 ==> 非必传（默认为{}） */
  initParam?: any
  /**是否显示表格功能按钮 ==> 非必传（默认为true） */
  toolButton?: boolean
  /**当表格数据多选时，所指定的 id ==> 非必传（默认为 id） */
  selectId?: string
  /**表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } */
  searchCol?: number | Record<BreakPoint, number>
  /**是否显示搜索 */
  isShowSearch?: boolean
  /**是否显示表格顶部的操作栏 ==> 非必传，默认为false */
  showTableTop?: boolean
  columnResizable?: boolean
  /**最大列宽，超出显示省略号 */
  maxColWidth?:string
}

const props = withDefaults(defineProps<ParamTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  dataCallback: (data) => data,
  toolButton: true,
  selectId: "id",
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  isShowSearch: true,
  maxColWidth:'200px'
})

const {
  tableRef,
  tableData,
  pageable,
  searchParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  tableColumns,
  enumMap,
  selectionChange,
  selectedKeys,
  searchColumns,
  loading,
  densityState,
  changeDensitySize,
  stripe,
  handleChange,
  showColumns,
  selectedRows
} = methods(props)

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
  element: tableRef,
  tableData,
  searchParam,
  pageable,
  getTableList,
  clearSelection,
  reset,
  enumMap,
  selectedKeys,
  selectedRows
})

const maxColWidth = computed(() => props.maxColWidth)
</script>
<style lang="less" scoped>
.a-button {
  margin-bottom: 15px;
}
.tools {
  display: flex;
  align-items: center;
}
.action-icon {
  cursor: pointer;
}
.active {
  color: #0960bd;
  background-color: #e3f4fc;
}
.arco-pagination {
  margin-top: 10px;
  justify-content: end;
}
.setting {
  display: flex;
  align-items: center;
  width: 200px;
  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
:deep(.arco-table .arco-table-element) {
  width: auto!important;
  .arco-table-td {
    max-width: v-bind(maxColWidth);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
