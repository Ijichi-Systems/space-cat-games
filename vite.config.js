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

function countLines(dir, baseDir = dir) {
    let count = 0;
    if (!fs.existsSync(dir)) return 0;
    const files = fs.readdirSync(dir);
    
    const ignoredDirs = ['node_modules', '.git', 'dist', 'archive', 'vendor', '.husky'];
    const ignoredFiles = ['package-lock.json', '.DS_Store'];

    for (const file of files) {
        if (ignoredDirs.includes(file) || ignoredFiles.includes(file)) continue;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            count += countLines(filePath, baseDir);
        } else {
            // Include all text-based files, or just everything that isn't binary
            // For simplicity and to "include ALL files", we'll count all files that aren't in ignored list
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                count += content.split('\n').length;
            } catch {
                // Skip files that can't be read as utf8 (likely binary)
                continue;
            }
        }
    }
    return count;
}

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
      sloc: countLines(path.resolve('.')),
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