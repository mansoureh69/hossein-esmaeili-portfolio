import { test, expect } from '@playwright/test';

for (const reduced of [false, true]) {
  test(`shutter project slider, reduced motion ${reduced}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await page.goto('/');
    const slider = page.locator('.projects-shutter');
    await slider.scrollIntoViewIfNeeded();
    await expect(slider).toHaveCount(1);
    await expect(page.locator('.project-card')).toHaveCount(0);
    await expect(slider.locator('h3')).toContainText('Kaveh');
    await slider.getByRole('button', { name: 'Next project' }).click();
    await expect(slider.locator('h3')).toContainText('District 21 Municipal');
    if (!reduced) await expect(slider.locator('.sb-slat')).toHaveCount(8);
    await expect(slider).toHaveAttribute('data-moving', '0');
    await expect(slider.locator('.sb-base img')).toHaveAttribute('alt', 'District 21 Municipal Office');
    await expect(slider.locator('.project-details')).toContainText('36,000');
    await slider.getByRole('button', { name: 'Previous project' }).click();
    await expect(slider).toHaveAttribute('data-moving', '0');
    await slider.getByRole('button', { name: 'Previous project' }).click();
    await expect(slider.locator('h3')).toContainText('Karbala');
    await expect(slider).toHaveAttribute('data-moving', '0');
    const filters = page.locator('.project-filters');
    await filters.getByRole('button', { name: 'Office & commercial' }).click();
    await expect(slider.locator('.sb-count')).toHaveText('01 / 04');
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(slider.locator('h3')).toContainText('Medical');
    await expect(slider).toHaveAttribute('data-moving', '0');
    await filters.getByRole('button', { name: 'Hospitality' }).click();
    await expect(slider.locator('h3')).toContainText('Karbala');
    await expect(slider.locator('.sb-btn')).toHaveCount(0);
    await page.setViewportSize({ width: 360, height: 800 });
    await page.getByRole('button', { name: '\u062a\u063a\u06cc\u06cc\u0631 \u0632\u0628\u0627\u0646 \u0628\u0647 \u0641\u0627\u0631\u0633\u06cc' }).click();
    await expect(slider).toHaveAttribute('dir', 'rtl');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await slider.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/shutter-mobile-${reduced}.png` });
    expect(errors).toEqual([]);
  });
}
