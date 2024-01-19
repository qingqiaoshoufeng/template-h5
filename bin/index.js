#!/usr/bin/env node

import fse from 'fs-extra'
import path from 'path'
import { Command } from 'commander'
import { fileURLToPath } from 'url'
import { invokeVite } from './invoke-vite.js'

const __fileNameNew = fileURLToPath(import.meta.url)

const __dirNameNew = path.dirname(__fileNameNew)

const configPath = path.resolve(__dirNameNew, "../vite.config.js");

const pkg = fse.readJsonSync(path.resolve(__dirNameNew, '../package.json'))

const program = new Command()

const handleAction = (command, str, { args = [] }, env = {}) => {
  const strArray = [];
  const keys = Object.keys(str);
  keys.forEach((key) => {
    if (str[key]) {
      strArray.push(`${key.length > 1 ? "--" : "-"}${key}`);
      if (typeof str[key] !== "boolean") strArray.push(str[key]);
    }
  });

  invokeVite([command, "--config", configPath, ...args, ...strArray], env);
};


program.usage('[command] [options]').version(pkg.version, '-v')

program
  .command("dev")
  .description("在当前目录下启动 Vite 开发服务器")
  .option("--base <path>", `[string] public base path (default: /)`)
  .option("-l, --logLevel <level>", `[string] info | warn | error | silent`)
  .option("--clearScreen", `[boolean] allow/disable clear screen when logging`)
  .option("-d, --debug [feat]", `[string | boolean] show debug logs`)
  .option("-f, --filter <filter>", `[string] filter debug logs`)
  .option("-m, --mode <mode>", `[string] set env mode`)
  .option("--host [host]", `[string] specify hostname`)
  .option("--port <port>", `[number] specify port`)
  .option("--https", `[boolean] use TLS + HTTP/2`)
  .option("--open [path]", `[boolean | string] open browser on startup`)
  .option("--cors", `[boolean] enable CORS`)
  .option("--strictPort", `[boolean] exit if specified port is already in use`)
  .option("--force", `[boolean] force the optimizer to ignore the cache and re-bundle`)
  .action((...args) => {
    handleAction(...["serve", ...args]);
  });

program
  .command("build")
  .description("构建生产版本")
  .option("--base <path>", `[string] public base path (default: /)`)
  .option("-m, --mode <mode>", `[string] set env mode`)
  .option("--target <target>", `[string] transpile target (default: 'modules')`)
  .option("--outDir <dir>", `[string] output directory (default: dist)`)
  .option("--assetsDir <dir>", `[string] directory under outDir to place assets in (default: assets)`)
  .option("--assetsInlineLimit <number>", `[number] static asset base64 inline threshold in bytes (default: 4096)`)
  .option("--ssr [entry]", `[string] build specified entry for server-side rendering`)
  .option("--sourcemap", `[boolean] output source maps for build (default: false)`)
  .option(
    "--minify [minifier]",
    `[boolean | "terser" | "esbuild"] enable/disable minification, ` + `or specify minifier to use (default: esbuild)`,
  )
  .option("--manifest [name]", `[boolean | string] emit build manifest json`)
  .option("--ssrManifest [name]", `[boolean | string] emit ssr manifest json`)
  .option("--force", `[boolean] force the optimizer to ignore the cache and re-bundle (experimental)`)
  .option("--emptyOutDir", `[boolean] force empty outDir when it's outside of root`)
  .option("-w, --watch", `[boolean] rebuilds when modules have changed on disk`)
  .action((...args) => {
    handleAction(...["build", ...args]);
  });

program
  .command("optimize")
  .description("预构建依赖")
  .option("--force", `[boolean] force the optimizer to ignore the cache and re-bundle`)
  .action((...args) => {
    handleAction(...["optimize", ...args]);
  });

program
  .command("preview")
  .description("本地预览构建产物")
  .option("--host [host]", `[string] specify hostname`)
  .option("--port <port>", `[number] specify port`)
  .option("--strictPort", `[boolean] exit if specified port is already in use`)
  .option("--https", `[boolean] use TLS + HTTP/2`)
  .option("--open [path]", `[boolean | string] open browser on startup`)
  .option("--outDir <dir>", `[string] output directory (default: dist)`)
  .action((...args) => {
    handleAction(...["preview", ...args]);
  });
program.parse(process.argv)