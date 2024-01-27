import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import lodash from 'lodash'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default async ({ command, mode }) => {
  const { merge } = lodash

  const settings = await import(pathToFileURL(`${path.resolve(process.cwd(), './src/config/vite-config.js')}`))
  const { default: { vite, server } } = settings
  const env = loadEnv(mode, process.cwd(), '')

  const viteConfig = vite && vite({ command, mode, env })
  const serverConfig = server && server({ command, mode, env })

  const defaultConfig = defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '~': path.resolve(process.cwd(), './'),
        '@': path.resolve(process.cwd(), './src'),
        '#': path.resolve(process.cwd(), './node_modules/@castle/template-h5/src'),
      },
    },
    server: serverConfig,
  })

  return merge(defaultConfig, viteConfig)
}
