import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

// Git info
function gitInfo() {
  try {
    const commit = execSync('git rev-parse --short HEAD').toString().trim()
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
    return { commit, branch }
  } catch {
    return { commit: 'unknown', branch: 'unknown' }
  }
}

const git = gitInfo()

// Vite version
const vitePkgPath = path.resolve('./node_modules/vite/package.json')
const viteVersion = JSON.parse(fs.readFileSync(vitePkgPath, 'utf-8')).version

// App version
const appPkgPath = path.resolve('./package.json')
const appVersion = JSON.parse(fs.readFileSync(appPkgPath, 'utf-8')).version

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
      vite: viteVersion,
      appVersion: appVersion,
      gitCommit: git.commit,
      gitBranch: git.branch,
    }),
  },
  optimizeDeps: {
    entries: ['index.html'],
    exclude: ['public/games/*'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})