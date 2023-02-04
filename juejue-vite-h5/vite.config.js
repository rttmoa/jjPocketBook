import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  /**--- 配置 CSS 预处理器 Less、 安装：npm i less -D---**/
  plugins: [reactRefresh(), styleImport(
    {
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        }
      ]
    }
  )],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript、支持 less 内联 JS
        javascriptEnabled: true,
      }
    }
  },
  /**--- resolve.alias 别名设置、 解释：这里我们必须得设置好别名，否则在页面中，你会写出很长一串类似这样的代码 ../../../ ---**/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'config': path.resolve(__dirname, 'src/config') // src 路径
    }
  },
  /**--- 这样配置完之后，开发环境下，/api/userInfo -> http://api.chennick.wang/api/userInfo。这样就解决了大家老大难的跨域问题 ---**/
  // server: {
  //   proxy: {
  //     '/api': {
  //       // 当遇到 /api 路径时，将其转换成 target 的值
  //       target: 'http://47.99.134.126:7009',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
  //     }
  //   }
  // }
})
