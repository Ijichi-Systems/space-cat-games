#!/usr/bin/env node
/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const apiOutputPath = path.join(process.cwd(), 'public', 'api', 'games.json');

// Read current games.json
const data = JSON.parse(fs.readFileSync(apiOutputPath, 'utf8'));
const games = data.games || [];

console.log(`Processing ${games.length} games...\n`);

// Get commit history with dates for each game
const commitDates = new Map();

// Build a map of commit hashes to dates
try {
  const logOutput = execSync('git log --all --date=iso --format="%H %ad" -- public/api/games.json public/games.json', {
    encoding: 'utf8',
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  const logLines = logOutput.trim().split('\n').filter(l => l.trim());
  console.log(`Found ${logLines.length} commits for games.json\n`);

  for (const logLine of logLines) {
    const match = logLine.match(/^([0-9a-f]{40})\s(.+)/);
    if (match) {
      const hash = match[1];
      const dateStr = match[2];
      commitDates.set(hash, new Date(dateStr).toISOString());
    }
  }
} catch (e) {
  console.warn('Warning: git log failed:', e.message);
}

// Use git blame to map games to commits
try {
  const blameOutput = execSync('git blame --line-porcelain public/api/games.json', {
    encoding: 'utf8',
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  const blameLines = blameOutput.split('\n');

  // Parse blame output to get line-to-hash mapping and extract dates
  for (let i = 0; i < blameLines.length; i++) {
    const line = blameLines[i];

    // Extract commit hash and metadata
    if (/^[0-9a-f]{40}/.test(line) || line.startsWith('^')) {
      const hash = line.split(/\s+/)[0].replace('^', '');

      // Extract date from committer-date line
      for (let j = i + 1; j < Math.min(i + 20, blameLines.length); j++) {
        if (blameLines[j].startsWith('committer-date ')) {
          const timestamp = parseInt(blameLines[j].split(' ')[1]);
          const date = new Date(timestamp * 1000).toISOString();
          commitDates.set(hash, date);
          break;
        }
      }
    }
  }

  // Now map games to their commit dates
  let gameIndex = 0;
  for (let i = 0; i < blameLines.length; i++) {
    const line = blameLines[i];

    // Look for lines containing "title": to identify game entries
    if (line.includes('"title":') && gameIndex < games.length) {
      // Find the commit hash for this line by looking backwards
      let hash = null;
      for (let j = i - 1; j >= Math.max(0, i - 50); j--) {
        if (/^[0-9a-f]{40}/.test(blameLines[j]) || blameLines[j].startsWith('^')) {
          hash = blameLines[j].split(/\s+/)[0].replace('^', '');
          break;
        }
      }

      if (hash && commitDates.has(hash)) {
        games[gameIndex].addedDate = commitDates.get(hash);
        console.log(`${gameIndex + 1}. ${games[gameIndex].title} → ${games[gameIndex].addedDate}`);
      }
      gameIndex++;
    }
  }
} catch (e) {
  console.warn('Warning: git blame failed:', e.message);
}

// For games without dates, assign based on repository creation date
if (games.some(g => !g.addedDate)) {
  console.log('\nAssigning dates to remaining games...');
  try {
    const firstCommit = execSync('git log --all --date=iso --format="%ad" --reverse -- public/api/games.json public/games.json | head -1', {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim();

    if (firstCommit) {
      for (let i = 0; i < games.length; i++) {
        if (!games[i].addedDate) {
          games[i].addedDate = new Date(firstCommit).toISOString();
          console.log(`${i + 1}. ${games[i].title} → ${games[i].addedDate} (earliest commit)`);
        }
      }
    }
  } catch (e) {
    console.warn('Could not determine commit date:', e.message);
  }
}

// Final fallback: use current date
const now = new Date().toISOString();
for (let i = 0; i < games.length; i++) {
  if (!games[i].addedDate) {
    games[i].addedDate = now;
  }
}

// Write updated games.json
const updatedData = { ...data, games };
fs.writeFileSync(apiOutputPath, JSON.stringify(updatedData, null, 2), 'utf8');

// Also update public/games.json if it exists
const gamesJsonPath = path.join(process.cwd(), 'public', 'games.json');
if (fs.existsSync(gamesJsonPath)) {
  fs.writeFileSync(gamesJsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`\n✓ Updated ${gamesJsonPath}`);
}

console.log(`✓ Updated ${apiOutputPath}`);
console.log(`✓ Added addedDate to ${games.length} games\n`);

