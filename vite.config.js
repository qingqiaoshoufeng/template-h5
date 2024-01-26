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

  const userConfig = vite && vite({ command, mode, env })

  const defaultConfig = defineConfig({
    server: server && server({ command, mode, env }),
    plugins: [vue()],
  })

  return merge(defaultConfig, userConfig)
}
