import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import os from "node:os"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000,
    allowedHosts: true,
  },
  define: {
    __BUILD_INFO__: JSON.stringify({
      date: new Date().toISOString(),
      host: os.hostname(),
      os: `${os.type()} ${os.release()} ${os.arch()}`,
      node: process.version,
      vite: process.env.VITE_VERSION,
      appVersion: process.env.APP_VERSION,
      gitCommit: process.env.GIT_COMMIT,
      gitBranch: process.env.GIT_BRANCH,
    }),
  },
  optimizeDeps: {
    entries: ["index.html"],
    exclude: ["public/games/*"],
  },
})