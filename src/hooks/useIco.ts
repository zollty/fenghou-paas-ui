import { ref, watch } from 'vue'
function handleIcoCreate(icoUrl: string) {
  const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = icoUrl
  document.getElementsByTagName('head')[0].appendChild(link)
}
export function useIco(href: string) {
  const ico = ref(href)

  watch(ico, handleIcoCreate,{
    deep:true,
    immediate:true
  })

  return ico
}
