<template>
  <span class="number-to">{{ translateNumber(showValue, splitLength) }}</span>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import { translateNumber } from "@/utils"

const props = defineProps({
  value: {
    type: [String, Number],
    default: 0
  },
  //过渡秒数
  time: {
    type: Number,
    default: 500
  },
  splitLength: {
    type: Number,
    default: undefined
  }
})

const number = computed(() => {
  if (typeof props.value === "string") {
    return parseFloat(props.value)
  }
  return props.value
})
const showValue = ref(0)

let rafId: number | null = null
const frame = 16 //默认帧数
/**
 *
 * @param start 开始数
 * @param end  结束数
 * @param gap 差距
 */
const trans = (start: number, end: number, step: number) => {
  //变小
  if (start > end) {
    if (showValue.value !== end) {
      showValue.value -= step
    }
    //变大
  } else {
    if (showValue.value !== end) {
      showValue.value += step
    }
  }
  rafId = requestAnimationFrame(() => {
    trans(start, end, step)
  })
  if (start > end && showValue.value <= end) {
    showValue.value = end
    rafId && cancelAnimationFrame(rafId)
  }
  if (start < end && showValue.value >= end) {
    showValue.value = end
    rafId && cancelAnimationFrame(rafId)
  }
}
watch(
  number,
  (newVal, oldVal) => {
    const start = oldVal || 0
    const end = newVal
    const step = Math.ceil(Math.abs(end - start) / (props.time / frame))
    trans(start, end, step)
  },
  {
    immediate: true
  }
)
</script>
