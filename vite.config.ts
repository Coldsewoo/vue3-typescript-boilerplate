import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: process.env.BASE_URL || '/',
  server: {
    host: '127.0.0.1',
    port: 8080,
    strictPort: true,
  },
  plugins: [
    vue(),
    viteCompression(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  optimizeDeps: {},
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      scss: {
        additionalData: "@import 'src/assets/scss/variables';",
      },
    },
  },
  resolve: {
    alias: [
      { find: '/@', replacement: resolve(__dirname, 'src') },
      { find: '/Assets', replacement: resolve(__dirname, 'src/assets') },
      {
        find: '/Components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '/Libraries', replacement: resolve(__dirname, 'src/libraries') },
      { find: '/Services', replacement: resolve(__dirname, 'src/services') },
      { find: '/Views', replacement: resolve(__dirname, 'src/views') },
      { find: '/Pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '/Mixins', replacement: resolve(__dirname, 'src/mixins') },
      { find: '/Constants', replacement: resolve(__dirname, 'src/constants') },
      { find: '/Layouts', replacement: resolve(__dirname, 'src/layouts') },
      { find: '/Projects', replacement: resolve(__dirname, 'src/projects') },
      { find: '/Hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '/Config', replacement: resolve(__dirname, 'src/config') },
      { find: '/Store', replacement: resolve(__dirname, 'src/store') },
      { find: '/Utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '/Type', replacement: resolve(__dirname, 'src/typings') },
      { find: '/Workers', replacement: resolve(__dirname, 'src/workers') },
    ],
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 1,
        keep_infinity: true,
      },
    },
    minify: 'terser',
    brotliSize: true,
    target: 'esnext',
    rollupOptions: {
      external: (id) => /^\/media\/.*/.test(id),
      output: {},
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    keepNames: true,
  },
})
