import { test, expect } from '@playwright/test';

test('intro, carousel, projects, navigation and direct contact', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.loader')).toHaveCount(0, { timeout: 10000 });
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.focus-copy')).toContainText('Detailed design. Clear execution');
  await page.getByRole('button', { name: 'Previous theme' }).click();
  await expect(page.locator('.focus-copy')).toContainText('Lighting, cabling & fire alarm');
  await page.getByRole('button', { name: 'Next theme' }).click();
  await expect(page.locator('.focus-copy')).toContainText('Detailed design. Clear execution');
  await page.getByRole('link', { name: 'Explore Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('.projects-shutter')).toContainText('Kaveh Residential');
  await expect(page.locator('.projects-shutter')).not.toHaveRole('button');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Instagram: Link coming soon' })).toBeDisabled();
  await expect(page.locator('#contact').getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/hossein-esmaeili-3935672b1/');
  await expect(page.locator('#contact').getByRole('link', { name: 'Telegram' })).toHaveAttribute('href', 'https://t.me/Hosseines1213');
  await expect(page.locator('.focus-block')).toHaveCount(4);
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Navigation');
  await page.getByRole('navigation', { name: 'Full navigation' }).getByRole('button', { name: /Contact/ }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  for (const selector of ['.hero-buttons', '.contact-actions', '.header', '.footer']) {
    await expect(page.locator(`${selector} a[href="mailto:h.esmaeili1213@gmail.com"]`)).toHaveCount(1);
  }
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByText(/Demo form|Demo complete|Message sent/)).toHaveCount(0);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', 'mailto:h.esmaeili1213@gmail.com');
  await page.keyboard.press('Escape');
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
