#!/usr/bin/env node

// This is only known to work on Linux.

/* @author meowcat767 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiPath = path.join(__dirname, '..', 'public', 'api', 'games.json');

async function askQuestion(question) {
    const readline = await import('readline/promises');
    const rl = readline.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await rl.question(question);
    rl.close();
    return answer;
}

async function main() {
    console.log('\n Add New Game to Space Cat Games\n');
    console.log('\n (C) Space Cat Games - Neuron Technologies, Nijika Softworks. All rights reserved.')
    console.log('Press Ctrl+C at any time to cancel\n');

    const title = await askQuestion('Game title: ');
    if (!title.trim()) {
        console.error('Error: Title is required');
        process.exit(1);
    }

    const url = await askQuestion('Game URL (e.g., /games/game.html or https://example.com): ');
    if (!url.trim()) {
        console.error('Error: URL is required');
        process.exit(1);
    }

    const img = await askQuestion('Icon URL (e.g., /images/gameicon.png or https://example.com/icon.jpg): ');
    const alt = await askQuestion('Alt text (description, optional): ');

    // Read existing games.json
    let data;
    try {
        data = JSON.parse(fs.readFileSync(apiPath, 'utf8'));
    } catch (e) {
        console.error(`Error reading ${apiPath}:`, e.message);
        process.exit(1);
    }

    // Create new game entry
    const newGame = {
        title: title.trim(),
        url: url.trim(),
        img: img.trim() || '/images/noimg.png',
    };

    if (alt.trim()) {
        newGame.alt = alt.trim();
    }

    // Add to games array
    data.games.push(newGame);
    data.games.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base', numeric: true }));
    data.count = data.games.length;
    data.generatedAt = new Date().toISOString();

    // Write back
    fs.writeFileSync(apiPath, JSON.stringify(data, null, 2), 'utf8');

    console.log(`\nAdded "${title}" to games.json!`);
    console.log(`   Total games: ${data.count}`);
    console.log('\nDon\'t forget to:');
    console.log(`   1. Add the game file to public${url}`);
    console.log(`   2. Add an icon image if you used a local path`);
    console.log('');
}

main().catch(console.error);

