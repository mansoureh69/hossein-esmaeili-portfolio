import { test, expect } from '@playwright/test';
test('full hero background reveals original image on hover', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.loader')).toHaveCount(0);
  const hero = page.locator('.hero');
  const background = page.locator('.hero-image');
  const h = await hero.boundingBox();
  const b = await background.boundingBox();
  expect(b!.width).toBe(h!.width);
  expect(b!.height).toBe(h!.height);
  await page.mouse.move(1000, 300);
  await page.mouse.move(1100, 350, { steps: 10 });
  await expect.poll(() => page.locator('.hero-image canvas').evaluate((canvas: HTMLCanvasElement) => {
    const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    return pixels.some((value, i) => i % 4 === 3 && value > 0);
  })).toBe(true);
  await page.screenshot({ path: 'test-results/hero-hover.png' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero-image canvas')).toBeHidden();
  await page.setViewportSize({ width: 320, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('.hero-buttons')).toBeVisible();
});
