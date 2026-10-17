import { test, expect } from '@playwright/test';

test('intro, carousel, projects, navigation and demo form', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.loader')).toHaveCount(0, { timeout: 10000 });
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.focus-copy')).toContainText('Detailed design. Clear execution.');
  await page.getByRole('button', { name: 'Previous theme' }).click();
  await expect(page.locator('.focus-copy')).toContainText('Lighting, cabling & fire alarm.');
  await page.getByRole('button', { name: 'Next theme' }).click();
  await expect(page.locator('.focus-copy')).toContainText('Detailed design. Clear execution.');
  await page.getByRole('link', { name: 'Explore Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('.projects-shutter')).toContainText('Kaveh Residential');
  await expect(page.locator('.projects-shutter')).not.toHaveRole('button');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Instagram: Link coming soon' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'LinkedIn: Link coming soon' })).toBeDisabled();
  await expect(page.locator('#contact').getByRole('link', { name: 'Telegram' })).toHaveAttribute('href', 'https://t.me/Hosseines1213');
  await expect(page.locator('.focus-block')).toHaveCount(4);
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Navigation');
  await page.getByRole('navigation', { name: 'Full navigation' }).getByRole('button', { name: /Contact/ }).click();
  await expect(page.getByRole('dialog')).toContainText('Demo form — messages are not sent.');
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('#contact-name')).toBeFocused();
  await page.getByLabel('Name', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Project or message').fill('Testing the local demonstration form.');
  const posted: string[] = []; page.on('request', r => { if (r.method() === 'POST') posted.push(r.url()); });
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByRole('heading', { name: 'Demo complete' })).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Your message was not sent.');
  expect(posted).toEqual([]);
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await page.locator('.hero-buttons').getByRole('button', { name: 'Get in Touch' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('');
  await page.getByRole('button', { name: 'Close dialog' }).focus();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Send Message' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await page.getByRole('dialog').click({ position: { x: 5, y: 5 } });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const width of [360, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/'); await expect(page.locator('.loader')).toHaveCount(0, { timeout: 10000 });
    await page.evaluate(async () => { await document.fonts.ready; });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow).toBe(false);
    if (width >= 1024) {
      await expect(page.getByRole('button', { name: 'Open navigation' })).toBeHidden();
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    } else {
      await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
    }
    for (const id of ['about','projects','expertise','experience','contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true });
  });
}

test('reduced motion and menu navigation', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/'); await expect(page.locator('.loader')).toHaveCount(0);
  await expect(page.locator('.hero-image canvas')).toBeHidden();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Full navigation' }).getByRole('button', { name: /Experience/ }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('#experience')).toBeInViewport();
});

test('local illustration and complete visual review', async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.loader')).toHaveCount(0, { timeout: 10000 });
  await expect.poll(() => page.locator('.hero-image img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('.loader')).toHaveCount(0);
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({ path: 'test-results/desktop-complete.png', fullPage: true });
  await page.screenshot({ path: 'test-results/desktop-hero.png' });
  await page.setViewportSize({ width: 360, height: 900 });
  await page.screenshot({ path: 'test-results/mobile-complete.png', fullPage: true });
  await page.screenshot({ path: 'test-results/mobile-hero.png' });
});
