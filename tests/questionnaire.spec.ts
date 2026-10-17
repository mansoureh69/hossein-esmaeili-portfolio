import { test, expect } from '@playwright/test';

test('questionnaire facts and real contact paths exist in both languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.loader')).toHaveCount(0);
  await expect(page.locator('.projects-shutter')).toHaveCount(1);
  await expect(page.locator('.sb-count')).toHaveText('01 / 16');
  await expect(page.locator('#experience')).toContainText('7 years of professional experience');
  await expect(page.locator('#experience')).not.toContainText('Present');
  await expect(page.locator('#contact a[href="tel:+989190219729"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href="mailto:h.esmaeili1213@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href="https://t.me/Hosseines1213"]')).toHaveCount(1);
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await expect(page.locator('.skills')).not.toContainText('LTspice');
  await page.getByRole('button', { name: 'تغییر زبان به فارسی' }).click();
  await expect(page.locator('#experience')).toContainText('۷ سال تجربه حرفه‌ای');
  await expect(page.locator('#projects')).not.toContainText('خوابگاه شهید آوینی');
  await expect(page.locator('#expertise')).toContainText('نقشه‌های اجرایی و برداشت ازبیلت');
});
