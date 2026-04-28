/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import fs from 'fs';
import path from 'path';

const apiPath = './public/api/games.json';

try {
    const content = fs.readFileSync(apiPath, 'utf8');
    const data = JSON.parse(content);

    data.games.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base', numeric: true }));

    fs.writeFileSync(apiPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully sorted games.json');
} catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
}
