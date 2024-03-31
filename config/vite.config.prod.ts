import { ConfigEnv, mergeConfig} from "vite"
import baseConfig from "./vite.config.base"
import configCompressPlugin from "./plugin/compress"
import configVisualizerPlugin from "./plugin/visualizer"
import configArcoResolverPlugin from "./plugin/arcoResolver"
import configStyleImportPlugin from "./plugin/styleImport"
import resourceImportPlugin from "./plugin/resourceImport"

export default (configEnv: ConfigEnv) => {
  const { mode } = configEnv
  // const pros = { ...process.env, ...loadEnv(mode, process.cwd()) }
  console.log("当前启动模式：", mode)
  return mergeConfig(
    {
      base: "./",
      mode: mode,
      plugins: [
        configCompressPlugin("gzip"),
        configVisualizerPlugin(),
        configArcoResolverPlugin(),
        configStyleImportPlugin(),
        resourceImportPlugin(false)
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              arco: ["@arco-design/web-vue"],
              chart: ["echarts", "vue-echarts"],
              vue: ["vue", "vue-router", "pinia", "@vueuse/core"]
            }
          }
        },
        chunkSizeWarningLimit: 2000
      }
    },
    baseConfig
  )
}
