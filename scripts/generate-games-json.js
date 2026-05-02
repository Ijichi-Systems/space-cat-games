/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

const inputPath = path.join(process.cwd(), 'public', 'games.html');
const outputPath = path.join(process.cwd(), 'public', 'games.json');
const apiDir = path.join(process.cwd(), 'public', 'api');
const apiOutputPath = path.join(apiDir, 'games.json');

function normalizeUrl(href) {
  if (!href) return null;
  href = href.trim();
  // If it's an absolute URL (http(s):) keep it
  if (/^https?:\/\//i.test(href) || /^\/\//.test(href)) return href;
  try {
    // Resolve relative URLs against /games.html base
    const base = 'http://example.com/games.html';
    const url = new URL(href, base);
    // return path + search + hash
    return url.pathname + url.search + url.hash;
  } catch (e) {
    return href;
  }
}

let games = [];

// Check if games.json already exists, if so use it (useful for CI/CD without HTML)
const existingJsonPath = apiOutputPath;
let existingGames = [];
if (fs.existsSync(existingJsonPath)) {
    try {
        const existingData = JSON.parse(fs.readFileSync(existingJsonPath, 'utf8'));
        if (existingData.games && existingData.games.length > 0) {
            existingGames = existingData.games;
            console.log(`Using existing ${apiOutputPath} with ${existingData.games.length} games`);
            fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2), 'utf8');
            console.log(`Wrote ${existingData.games.length} games to ${outputPath}`);
            process.exit(0);
        }
    } catch (e) {
        console.warn('Could not read existing games.json, falling back to HTML parsing');
    }
}

// Fallback: Parse HTML if it exists
if (!fs.existsSync(inputPath)) {
    console.error(`Error: ${inputPath} not found and no existing games.json to use`);
    process.exit(1);
}

const html = fs.readFileSync(inputPath, 'utf8');
const root = parse(html);

const items = root.querySelectorAll('.game-item');

games = items.map(item => {
  const img = item.querySelector('img');
  const p = item.querySelector('p');
  const btn = item.querySelector('button');
  const anchor = item.querySelector('a');

  let title = (p && p.text.trim()) || (img && img.getAttribute('alt')) || null;
  let imgSrc = img && img.getAttribute('src');
  let alt = img && img.getAttribute('alt');
  let url = null;

  if (btn) {
    const onclick = btn.getAttribute('onclick') || '';
    const m = onclick.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/i);
    if (m && m[1]) url = m[1];
  }

  if (!url && anchor) {
    url = anchor.getAttribute('href');
  }

  if (!url) {
    // try data-href or direct <a> inside button
    const innerA = item.querySelector('button a');
    if (innerA) url = innerA.getAttribute('href');
  }

  url = normalizeUrl(url);
  imgSrc = normalizeUrl(imgSrc);

  // If title missing, derive from url filename
  if (!title && url) {
    try {
      const u = new URL(url, 'http://example.com');
      title = decodeURIComponent(path.basename(u.pathname)).replace(/[-_\./]+/g, ' ');
    } catch (e) {
      title = url;
    }
  }

  // Preserve addedDate from existing games if in database, else use current date
  let addedDate = new Date().toISOString();
  const existingGame = existingGames.find(g => g.url === url);
  if (existingGame && existingGame.addedDate) {
    addedDate = existingGame.addedDate;
  }

  return { title, url, img: imgSrc, alt, addedDate };
});

// Filter out entries without a url and without title
const filtered = games.filter(g => g && (g.url || g.title));

const payload = { generatedAt: new Date().toISOString(), count: filtered.length, games: filtered };

// Ensure API directory exists
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');
fs.writeFileSync(apiOutputPath, JSON.stringify(payload, null, 2), 'utf8');

console.log(`Wrote ${filtered.length} games to ${outputPath} and ${apiOutputPath}`);
