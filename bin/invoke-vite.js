import { spawn } from "child_process"
import path from 'path'

export const invokeVite = (args, env) => {
  const vitePath = path.resolve("./node_modules/.bin/vite");

  const childProcess = spawn(
    process.platform === "win32" ? vitePath : process.execPath,
    process.platform === "win32" ? args : [vitePath, ...args],
    { stdio: "inherit", shell: true, env },
  );

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
      childProcess.kill("SIGKILL");
    });
  });
}
