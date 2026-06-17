import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '../src')

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(fullPath, files)
    else if (entry.name.endsWith('.vue')) files.push(fullPath)
  }
  return files
}

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  if (!content.includes('RouterLink')) return false

  content = content.replace(/<RouterLink/g, '<a')
  content = content.replace(/<\/RouterLink>/g, '</a>')
  content = content.replace(/\s+to="/g, ' href="')
  content = content.replace(/\s+:to="/g, ' :href="')
  content = content.replace(/\s+:to='([^']+)'/g, " :href='$1'")

  content = content.replace(
    /import\s*\{\s*RouterLink\s*,\s*([^}]+)\}\s*from\s*'vue-router'/g,
    "import { $1 } from 'vue-router'",
  )
  content = content.replace(/import\s*\{\s*RouterLink\s*\}\s*from\s*'vue-router'\s*\n/g, '')

  fs.writeFileSync(filePath, content, 'utf8')
  return true
}

let count = 0
for (const file of walk(srcDir)) {
  if (convertFile(file)) {
    count += 1
    console.log(path.relative(srcDir, file))
  }
}

console.log(`Updated ${count} files`)
