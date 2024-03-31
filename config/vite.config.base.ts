import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import svgLoader from "vite-svg-loader"
import style from "./style"

export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader({ svgoConfig: {} })],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "../src")
      },
      {
        find: "packages",
        replacement: resolve(__dirname, "../packages")
      },
      {
        find: "public",
        replacement: resolve(__dirname, "../public")
      },
      {
        find: "assets",
        replacement: resolve(__dirname, "../src/assets")
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js" // compile template
      }
    ],
    extensions: [".ts", ".js"]
  },
  define: {
    "process.env": {}
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "arco-theme-tag": ".arco-theme",
          ...style,
          hack: `true; @import (reference) "${resolve(
            "src/assets/style/breakpoint.less"
          )}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
