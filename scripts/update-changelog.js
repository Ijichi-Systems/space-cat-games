/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(DATA_DIR, 'commits.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

try {
  console.log('Fetching git commits...');
  const logData = execSync('git log -n 50 --pretty=format:"%h|%an|%ad|%s" --date=short').toString();
  
  const commits = logData.split('\n').filter(line => line.trim() !== '').map(line => {
    const [hash, author, date, message] = line.split('|');
    return { hash, author, date, message };
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(commits, null, 2));
  console.log(`Successfully updated ${OUTPUT_FILE} with ${commits.length} commits.`);
} catch (error) {
  console.error('Error fetching git commits:', error.message);
  // If git fails, we still want to ensure the file exists to avoid import errors
  if (!fs.existsSync(OUTPUT_FILE)) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([]));
  }
}
