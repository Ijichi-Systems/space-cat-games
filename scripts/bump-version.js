import fs from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const pkgPath = path.resolve('package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const versionParts = pkg.version.split('.').map(Number);
// Standard semver: major.minor.patch
// Incrementing patch by default
versionParts[2] += 1;

const newVersion = versionParts.join('.');
pkg.version = newVersion;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Version bumped to ${newVersion}`);

try {
    execSync(`git add ${pkgPath}`);
} catch (error) {
    console.error('Failed to stage package.json:', error.message);
    process.exit(1);
}
