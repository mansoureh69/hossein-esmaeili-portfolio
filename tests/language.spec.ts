import { test, expect } from '@playwright/test';

test('switches language, localizes content and dialogs, and remembers preference', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/'); await expect(page.locator('.loader')).toHaveCount(0);
  await page.getByRole('button', { name: 'تغییر زبان به فارسی' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page).toHaveTitle('حسین اسماعیلی — مهندس برق');
  await expect(page.locator('h1')).toContainText('طراحی برق');
  await expect(page.locator('.hero-description')).toContainText('من حسین اسماعیلی هستم');
  await expect(page.locator('.projects-shutter')).toContainText('مسکونی کاوه');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.hero-buttons').getByRole('link', { name: 'ارتباط با من' })).toHaveAttribute('href', 'mailto:h.esmaeili1213@gmail.com');
  await expect(page.locator('#contact').getByRole('link', { name: 'تلگرام', exact: true })).toHaveAttribute('href', 'https://t.me/Hosseines1213');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByText(/فرم آزمایشی|آزمایش انجام شد|پیام ارسال شد/)).toHaveCount(0);
  await page.reload(); await expect(page.locator('.loader')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await page.getByRole('button', { name: 'باز کردن منو' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Navigation');
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('h1')).toContainText('Electrical design');
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

for (const width of [360, 768, 1024, 1440]) {
  test(`Persian layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('hossein-portfolio-language', 'fa'));
    await page.goto('/'); await expect(page.locator('.loader')).toHaveCount(0);
    await page.evaluate(async () => { await document.fonts.ready; });
    await expect(page.locator('body')).toHaveCSS('direction', 'rtl');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(() => document.fonts.check('16px "Vazirmatn Variable"'))).toBe(true);
    const headerOverlap = await page.locator('.header-inner').evaluate(el => {
      const brand = el.querySelector('a')!.getBoundingClientRect();
      const actions = el.querySelector('.header-actions')!.getBoundingClientRect();
      return actions.right > brand.left;
    });
    expect(headerOverlap).toBe(false);
    await page.screenshot({ path: `test-results/persian-${width}.png`, fullPage: true });
    await page.screenshot({ path: `test-results/persian-hero-${width}.png` });
    await expect(page.locator('.hero-buttons').getByRole('link', { name: 'ارتباط با من' })).toHaveAttribute('href', 'mailto:h.esmaeili1213@gmail.com');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
}

test('Persian browser preference and disabled storage do not break startup', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'fa-IR', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('Storage unavailable'); } }); });
  await page.goto('http://127.0.0.1:5173/');
  await expect(page.locator('.loader')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});
