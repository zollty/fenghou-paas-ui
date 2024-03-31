import { useTitle } from '@vueuse/core'
import { computed, provide, inject, InjectionKey, ComputedRef, ref } from 'vue'
import { useIco } from './useIco'
interface TitleState {
  title?: string
  img?: string
  ico?: string
}
interface Titleico {
  setTitleState: (state: TitleState) => void
  titleIcoState: ComputedRef<{
    title: string
    img: string
  }>
}
const injectKey = Symbol() as InjectionKey<Titleico>
export function initTitleico() {
  const title = useTitle('数地科技')
  const ico = useIco('/favicon.ico')
  const img = ref('')
  const setTitleState = (state: TitleState) => {
    state.ico ? (ico.value = state.ico) : null
    state.title ? (title.value = state.title) : null
    img.value = state.img || ''
  }
  const titleIcoState = computed(() => ({
    title: title.value,
    img: img.value,
    ico: ico.value
  }))
  provide(injectKey, {
    setTitleState,
    titleIcoState
  })
}
export function useTitleico() {
  return inject(injectKey)
}
