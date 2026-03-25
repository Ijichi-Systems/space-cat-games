/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'public', 'content', 'blog');
const outputPath = path.join(process.cwd(), 'public', 'posts.json');

function generatePosts() {
  if (!fs.existsSync(blogDir)) {
    console.log('Blog directory not found, creating it...');
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(blogDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      const slug = file.replace('.md', '');
      
      const metadata = {};
      
      // Frontmatter parsing
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const lines = frontmatter.split('\n');
        lines.forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim().toLowerCase();
            const value = line.slice(colonIndex + 1).trim();
            metadata[key] = value;
          }
        });
        // Remove frontmatter from content to derive title if not in metadata
        content = content.replace(frontmatterMatch[0], '');
      }

      const title = metadata.title || (content.match(/^#\s+(.*)$/m)?.[1]) || slug;
      
      // Get file stats for date if not provided in metadata
      const stats = fs.statSync(filePath);
      const date = metadata.date || stats.mtime.toISOString().split('T')[0];

      return {
        slug,
        title,
        date,
        ...metadata,
        file: `/content/blog/${file}`
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const payload = {
    generatedAt: new Date().toISOString(),
    posts
  };

  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Generated ${posts.length} posts to ${outputPath}`);
}

generatePosts();
