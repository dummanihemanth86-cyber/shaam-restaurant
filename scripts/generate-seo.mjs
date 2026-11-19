import { mkdir, readFile, writeFile } from 'node:fs/promises'

let configuredUrl = process.env.VITE_SITE_URL
if (!configuredUrl) {
  for (const filename of ['.env.production', '.env']) {
    try {
      const content = await readFile(filename, 'utf8')
      const line = content.split(/\r?\n/).find(value => value.trim().startsWith('VITE_SITE_URL='))
      if (line) configuredUrl = line.slice(line.indexOf('=') + 1).trim().replace(/^['"]|['"]$/g, '')
      if (configuredUrl) break
    } catch {}
  }
}
let origin = ''
try {
  const url = new URL(configuredUrl ?? '')
  if (url.protocol === 'https:' && url.pathname === '/' && !url.search && !url.hash) origin = url.origin
} catch {}
const paths = ['/', '/about', '/menu', '/gallery', '/contact', '/reviews', '/privacy']
const sitemap = origin
  ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${origin}${path === '/' ? '' : path}</loc></url>`).join('\n')}\n</urlset>\n`
  : `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Set VITE_SITE_URL to the verified production origin before deployment. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" />\n`
await mkdir('dist', { recursive: true })
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : '# Set VITE_SITE_URL to publish the sitemap URL.\n'}`)
