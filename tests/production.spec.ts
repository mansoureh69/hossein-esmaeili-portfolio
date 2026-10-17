import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';

test('design system is available only in development', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/design-system');
  await expect(page.locator('.system-page')).toBeVisible();
  await page.goto('/design-system');
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('.system-page')).toHaveCount(0);
  const scripts = readdirSync('dist/assets').filter(file => file.endsWith('.js'));
  for (const script of scripts) {
    expect(readFileSync(`dist/assets/${script}`, 'utf8')).not.toContain('DESIGN SYSTEM 01');
  }
});

test('production deep links and static files remain usable', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/portfolio');
  await expect(page.locator('#hero-title')).toBeVisible();
  await page.getByRole('link', { name: 'Explore Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await page.reload();
  await expect(page.locator('#projects')).toBeVisible();
  for (const [path, type] of [
    ['/robots.txt', 'text/plain'], ['/sitemap.xml', 'xml'],
    ['/images/hero.webp', 'image/webp'], ['/favicon.svg', 'image/svg+xml'],
  ]) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain(type);
  }
});

test('Vercel fallback excludes static files and service paths', () => {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const rule = config.rewrites[0];
  const matcher = new RegExp(`^${rule.source}$`);
  expect(rule.destination).toBe('/index.html');
  for (const path of ['/', '/portfolio', '/portfolio/details', '/design-system']) expect(matcher.test(path), path).toBe(true);
  for (const path of ['/api', '/api/contact', '/_vercel/speed-insights/script.js', '/_vercel/insights/event', '/assets/app.js', '/images/hero.webp', '/videos/expertise-cad.mp4', '/robots.txt', '/sitemap.xml', '/favicon.svg']) expect(matcher.test(path), path).toBe(false);
});
