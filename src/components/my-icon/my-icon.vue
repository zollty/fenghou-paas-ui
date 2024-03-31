<template>
  <span v-if="name.includes('param-icon')" :class="['my-icon','arco-icon',name]"></span>
  <component :is="name" v-else></component>
</template>
<script lang="ts" setup>
/**兼容arco原有图标与paramicon，前缀带param-icon的为paramicon */
defineProps({
    name:{
        type:String,
        default:'icon-check-circle-fill'
    }
})
</script>
