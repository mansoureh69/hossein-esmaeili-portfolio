import { test, expect } from '@playwright/test';
test('expertise video plays in view and pauses outside or manually', async ({ page }) => {
  await page.goto('/');
  const video = page.locator('.expertise-background-video');
  await expect(video).not.toHaveAttribute('src', /mp4/);
  await page.locator('#expertise').scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute('src', '/videos/expertise-cad.mp4');
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0)).toBe(true);
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop)).toBe(true);
  await page.screenshot({ path: 'test-results/expertise-video.png' });
  await page.getByRole('button', { name: 'Pause background video' }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.getByRole('button', { name: 'Play background video' }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.locator('#expertise').scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
});
test('expertise video respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#expertise').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Play background video' })).toBeVisible();
  expect(await page.locator('video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
});
