import type { VNode, PropType as VuePropType } from 'vue'

// * global
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void
    browserLanguage: string
  }
  interface Window {
    // Global vue app instance
    __APP__: App<Element>
    require: (url: string) => string
    needLoadingRequestCount: number
    webkitCancelAnimationFrame: (handle: number) => void
    mozCancelAnimationFrame: (handle: number) => void
    oCancelAnimationFrame: (handle: number) => void
    msCancelAnimationFrame: (handle: number) => void
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number
  }
}

declare global {
  type Recordable<T = any> = Record<string, T>
  declare interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_PROXY_DOMAIN: string
    VITE_PROXY_DOMAIN_REAL: string
    VITE_LEGACY: boolean
    VITE_DEPLOY_ADRRESS: string
    /**  */
    VITE_APP_PT_URL: string
    VITE_APP_API_URL: string
    VITE_APP_LOGINBASE_URL: string
    VITE_SERVER_TO_SYSMGMT: string
    VITE_APP_UPLOAD_URL: string
    VITE_APP_URL_DOMAIN: string
    VITE_SERVER_TOKEN_NAME: string
    VITE_SERVER_XAppCode: string
    VITE_APP_SOURCE_MAP?: string
  }
  const viteEnv: ViteEnv

  // vue
  type PropType<T> = VuePropType<T>

  type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type Nullable<T> = T | null
  type NonNullable<T> = T extends null | undefined ? never : T
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  type Indexable<T = any> = {
    [key: string]: T
  }
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  interface WheelEvent {
    path?: EventTarget[]
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  function parseInt(s: string | number, radix?: number): number

  function parseFloat(string: string | number): number

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}

declare module 'vite-plugin-progress'
