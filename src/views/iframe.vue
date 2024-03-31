<template>
  <div class="right-table">
    <iframe
      v-if="isFrame"
      id="tab_iframe"
      height="100%"
      width="100%"
      :src="iframeUrl"
      frameborder="0"
    ></iframe>
  </div>
</template>
  
<script lang="ts" setup>
import { onBeforeUnmount, nextTick, onMounted } from "vue"
import { useRouter } from "vue-router"
// import { useAppStore } from "@/store"
import { getCurrentSystemList } from "@/router/system"
const router = useRouter()
  
// const appStore = useAppStore()
// appStore.tabBar = false
let isFrame = true

const systemList = getCurrentSystemList()
console.log("-----------------------====")
console.log(systemList)
console.log(router.currentRoute.value.meta.system)

// console.log(router.currentRoute.value.meta)
  
const tmp = router.currentRoute.value.meta.roles
let bgColor = "#18181c"
let iframeUrl = "http://zollty.com/tools/json.html"
if(tmp) {
  if(tmp.length>0) {
    iframeUrl = tmp[0]
  }
  if(tmp.length>1) {
    bgColor = tmp[1]
  }
}


let eleMain
  
const setMyIframeHeight = function(){
  // 页面可视高-顶部实际高-底部实际高-多余部分高度
  nextTick(() => {
    let headerHeight = document.getElementsByClassName("layout-navbar")[0].clientHeight
    let bodyHeight = document.body.clientHeight
    let outHeight =parseFloat(bodyHeight - headerHeight)-5+ "px"
    document.getElementById("tab_iframe").style.height = outHeight
  
    eleMain = document.getElementsByTagName("main")[0]
    if(bgColor) {
      eleMain.style.backgroundColor=bgColor
    }
  })
}

//document.getElementsByClassName("arco-layout-sider-children")[0]..style.display = "none"
  
const listener = () => setMyIframeHeight()
onMounted(()=>{
  setMyIframeHeight()
  window.addEventListener("resizeFrame", listener, false)
})
  
onBeforeUnmount(()=>{
  eleMain.style.backgroundColor=""
  window.removeEventListener("resizeFrame", listener, false)
  // appStore.tabBar = true
  isFrame = false
})
  
</script>
  
<style scoped lang="less">
:deep(.arco-layout-sider) {
  display: none;
}
:deep(.arco-layout-sider-children) {
  display: none;
}
:deep(.arco-menu-inner) {
  display: none;
}
.right-table {
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    background: var(--color-bg-2);
    padding: 10px;
  }
}
.header-top {
  margin: 0 0 15px 15px;
}
.operation-btn {
  padding: 0 5px;
}
.field-btn {
  margin-left: 15px;
}
</style>