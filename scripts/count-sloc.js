/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import fs from 'node:fs';
import path from 'node:path';

function countLines(dir) {
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
            count += countLines(filePath);
        } else {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                count += content.split('\n').length;
            } catch {
                continue;
            }
        }
    }
    return count;
}

const sloc = countLines(path.resolve('.'));
console.log(sloc);
