/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import fs from 'node:fs';
import path from 'node:path';

function countLines(dir) {
    let count = 0;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            count += countLines(filePath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(filePath, 'utf8');
            count += content.split('\n').length;
        }
    }
    return count;
}

const sloc = countLines(path.resolve('src'));
console.log(sloc);
