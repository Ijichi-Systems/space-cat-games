#!/usr/bin/env node

// This is only known to work on Linux.

/* @author meowcat767 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiPath = path.join(__dirname, '..', 'public', 'api', 'games.json');

function isValidGameUrl(value) {
    const v = value.trim();

    return v.startsWith('/') ||
        v.startsWith('https://') ||
        v.startsWith('http://');
}

async function main() {
    console.log('\n Add New Game to Space Cat Games\n');
    console.log('\n (C) Space Cat Games - Neuron Technologies, Nijika Softworks. All rights reserved.');
    console.log('Press Ctrl+C at any time to cancel\n');

    const readline = await import('readline');

    const rl = readline.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    const ask = (query) =>
        new Promise(resolve => rl.question(query, resolve));

    // Ask for title
    const title = await ask('Game title: ');

    if (!title.trim()) {
        console.error('Error: Title is required');
        rl.close();
        process.exit(1);
    }

    // Ask for URL
    const url = await ask('Game URL (e.g., /games/game.html or https://example.com): ');

    if (!url.trim()) {
        console.error('Error: URL is required');
        rl.close();
        process.exit(1);
    }

    if (!isValidGameUrl(url)) {
        console.error('Error: URL must start with /, https://, or http://');
        rl.close();
        process.exit(1);
    }

    // Read existing games.json
    let data;

    try {
        data = JSON.parse(fs.readFileSync(apiPath, 'utf8'));
    } catch (e) {
        console.error(`Error reading ${apiPath}: ${e.message}`);
        rl.close();
        process.exit(1);
    }

    // Duplicate check
    const exists = data.games.some(game =>
        game.title.toLowerCase() === title.trim().toLowerCase() ||
        game.url === url.trim()
    );

    if (exists) {
        console.error('FATAL: Entry already exists in games.json');
        rl.close();
        process.exit(1);
    }

    // Ask for optional fields
    const img = await ask('Icon URL (e.g., /images/gameicon.png or https://example.com/icon.jpg): ');
    const alt = await ask('Alt text (description, optional): ');

    rl.close();

    // Create new game entry
    const newGame = {
        title: title.trim(),
        url: url.trim(),
        img: img.trim() || '/images/noimg.png',
        addedAt: new Date().toISOString()
    };

    if (alt.trim()) {
        newGame.alt = alt.trim();
    }

    // Add to list
    data.games.push(newGame);

    data.games.sort((a, b) =>
        a.title.localeCompare(
            b.title,
            undefined,
            {
                sensitivity: 'base',
                numeric: true
            }
        )
    );

    data.count = data.games.length;
    data.generatedAt = new Date().toISOString();

    // Save file
    try {
        fs.writeFileSync(apiPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error(`Error writing ${apiPath}: ${e.message}`);
        process.exit(1);
    }

    console.log(`\nAdded "${title.trim()}" to games.json!`);
    console.log(`   Total games: ${data.count}`);
    console.log('\nDon\'t forget to:');
    console.log(`   1. Add the game file to public${url.trim()}`);
    console.log('   2. Add an icon image if you used a local path');
    console.log('');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});