/// <reference types="vite/client" />
/// <reference types="amap-js-api" />
import { TinyMCE } from "tinymce"

declare module "*.vue" {
  import { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

declare global {
  interface Window {
    tinymce: TinyMCE
  }
}
