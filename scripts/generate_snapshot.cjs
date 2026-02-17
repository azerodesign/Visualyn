const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const outputFile = path.join(rootDir, 'codebase_snapshot.md');

const ignoreDirs = ['node_modules', 'dist', '.git', 'scripts'];
const includeExts = ['.js', '.jsx', '.css', '.html', '.json'];

let content = "# Visualyn Codebase Snapshot\n\nGenerated on: " + new Date().toISOString() + "\n\n";

function readDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(rootDir, fullPath);

        if (fs.statSync(fullPath).isDirectory()) {
            if (!ignoreDirs.includes(file)) {
                readDir(fullPath);
            }
        } else {
            const ext = path.extname(file);
            if (includeExts.includes(ext) && !file.includes('package-lock.json')) {
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                content += `## File: ${relativePath}\n\n`;
                content += "```" + (ext.substring(1) || 'text') + "\n";
                content += fileContent + "\n";
                content += "```\n\n";
            }
        }
    }
}

console.log("Generating snapshot...");
readDir(rootDir);
fs.writeFileSync(outputFile, content);
console.log(`Snapshot saved to: ${outputFile}`);
