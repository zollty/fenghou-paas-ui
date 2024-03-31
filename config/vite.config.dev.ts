import { ConfigEnv, mergeConfig, loadEnv } from "vite"
import resourceImportPlugin from "./plugin/resourceImport"
//import eslint from 'vite-plugin-eslint';
import baseConfig from "./vite.config.base"
import basicSsl from "@vitejs/plugin-basic-ssl"
export default (configEnv: ConfigEnv) => {
  const { mode } = configEnv
  const pros = { ...process.env, ...loadEnv(mode, process.cwd()) }
  console.log("当前启动模式：", mode, pros.VITE_APP_COMPONENT_URL)
  return mergeConfig(
    {
      mode: mode,
      server: {
        // 是否开启 https
        https: false,
        // 端口号
        port: 9559,
        host: "0.0.0.0",
        // 本地跨域代理
        proxy: {
          "^/component/": {
            target: pros.VITE_APP_COMPONENT_URL,
            changeOrigin: true
          }
        }
      },
      plugins: [
        // basicSsl(),
        resourceImportPlugin(true)
        // eslint({
        //   cache: false,
        //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        //   exclude: ['node_modules'],
        // }),
      ]
    },
    baseConfig
  )
}
