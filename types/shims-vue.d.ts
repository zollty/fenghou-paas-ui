declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<any>
  export default component
}

declare module '*.less' {
  const less: Record<string, string>
  export default less
}
