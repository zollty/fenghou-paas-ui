<template>
  <teleport to="#right-toolbar">
    <!-- <a-button type="primary" @click="openPt">进入前台</a-button> -->
    <div class="container">
      <div class="logo-box" @click="openPt">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADESURBVHgB7dfhCcIwEAXgF3EAR8gouoGjuJkjiBvoBIkbuEG9IP4QmkpC7k7xfXAU0jbNg4QmABEREdH/CpPAWFlqF0LIrwb5RJJLhIIVxotSJxl0hAGNAEWUOsKAVoBiAwPrSvtF6o4224V7VzzXRuv7n8cxzYtoUJ6f6SM19tE1Ds0pZIIBvDGAt58PUPsPpPFbJB2cQgtuMKAVoGwd9jBQWwMZ/c5SBzkPtO6lutQCvB1IvhkXsTcG8MYAREREROTnAW/aY78KLwVLAAAAAElFTkSuQmCC"
          alt=""
          class="pt-logo"
        />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { envVar } from "@/config"
import { openWindow } from "@/utils"
import { getAppHref } from "@/utils/url"
const openPt = () => {
  const url = getAppHref("twin", "app-twin")
  url && openWindow(url)
}
</script>

<style lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 24px;
  background: #1e5dff;
  border-radius: 4px;
  cursor: pointer;
  .pt-logo {
    width: 20px;
    height: 20px;
  }
}
</style>
