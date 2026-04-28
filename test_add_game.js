/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { spawn } from 'child_process';

const child = spawn('node', ['scripts/add-game.js'], {
    stdio: ['pipe', 'inherit', 'inherit']
});

child.stdin.write('AAA Game\n/games/aaa.html\n/images/aaa.png\nAAA Alt\n');
child.stdin.end();

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    if (code === 0) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});
