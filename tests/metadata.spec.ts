import { test, expect } from '@playwright/test';

const canonical = 'https://hossein-esmaeili-portfolio.vercel.app/';

test('static sharing metadata and crawler files work without JavaScript', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain(`rel="canonical" href="${canonical}"`);
  expect(html).toContain('name="robots" content="index, follow"');
  expect(html).toContain('name="twitter:card" content="summary_large_image"');
  expect(html).toContain(`property="og:image" content="${canonical}images/og-portfolio.jpg"`);
  expect(html).toContain('property="og:image:width" content="1200"');
  expect(html).toContain('property="og:image:height" content="630"');
  expect(html).toContain('Phase 2, execution and as-built drawings');
  expect(html).not.toMatch(/Esameili|simulation/);
  expect((await request.get('/images/og-portfolio.jpg')).headers()['content-type']).toContain('image/jpeg');
  expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${canonical}sitemap.xml`);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain(`<loc>${canonical}</loc>`);
  expect(sitemap).not.toContain('/design-system');
});

test('metadata and name stay consistent when switching languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.loader')).toHaveCount(0);
  await expect(page).toHaveTitle('Hossein Esmaeili — Electrical Engineer');
  await expect(page.locator('.header .brand')).toContainText('Hossein Esmaeili');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Phase 2, execution and as-built drawings/);
  await page.getByRole('button', { name: 'تغییر زبان به فارسی' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page).toHaveTitle('حسین اسماعیلی — مهندس برق');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'حسین اسماعیلی — مهندس برق');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /نقشه‌های فاز دو/);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /نقشه‌های فاز دو/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'fa_IR');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', 'Hossein Esmaeili — Electrical Engineer');
  const size = await page.evaluate(async () => {
    const image = new Image();
    image.src = '/images/og-portfolio.jpg';
    await image.decode();
    return [image.naturalWidth, image.naturalHeight];
  });
  expect(size).toEqual([1200, 630]);
});
