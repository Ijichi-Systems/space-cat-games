/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { execSync } from "node:child_process"
import fs from "node:fs"

const gitCommit = execSync("git rev-parse --short HEAD").toString().trim()
const gitBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim()

const buildInfo = {
    gitCommit,
    gitBranch,
    date: new Date().toISOString(),
    node: process.version
}

fs.writeFileSync("public/build-info.json", JSON.stringify(buildInfo, null, 2))

