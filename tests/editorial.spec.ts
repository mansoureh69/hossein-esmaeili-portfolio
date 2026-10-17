import { test, expect } from '@playwright/test';
for (const language of ['en', 'fa']) {
  for (const width of [320, 768, 1024, 1440]) {
    test(`editorial ${language} ${width}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(lang => localStorage.setItem('hossein-portfolio-language', lang), language);
      await page.goto('/');
      await expect(page.locator('.loader')).toHaveCount(0);
      await expect(page.locator('h1')).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('.hero-image img')).toBeVisible();
      expect(await page.locator('.hero-image img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/editorial-${language}-${width}-hero.png` });
      for (const id of ['projects', 'about', 'expertise', 'experience', 'contact']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await expect(page.locator(`#${id}`)).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await expect(page.locator('.focus-block')).toHaveCount(6);
      await expect(page.locator('.hero-proof')).toContainText(language === 'en' ? '300,000+ m²' : '۳۰۰٬۰۰۰');
      await expect(page.locator('.about-credentials')).toContainText(language === 'en' ? 'Tehran Fire Department' : 'آتش‌نشانی تهران');
      const consultation = new URL((await page.locator('.hero-buttons a').first().getAttribute('href'))!);
      expect(consultation.protocol).toBe('mailto:');
      expect(consultation.pathname).toBe('h.esmaeili1213@gmail.com');
      expect(consultation.searchParams.get('subject')).toBe(language === 'en' ? 'Electrical engineering project consultation' : 'مشاوره مهندسی برق پروژه');
      await expect(page.locator('#contact .direct-contact a[href^="mailto:"]')).toHaveCount(1);
      await expect(page.locator('#contact .direct-contact a[href^="tel:"]')).toHaveCount(1);
      await expect(page.locator('#contact .direct-contact a[href^="https://t.me/"]')).toHaveCount(1);
      await page.locator('.project-secondary button').first().click();
      await expect(page.locator('.projects-shutter h3')).toContainText(language === 'en' ? 'Municipal' : 'شهرداری');
      await page.locator('#projects').scrollIntoViewIfNeeded();
      if (width >= 1024) await expect(page.locator('.header nav a[href="#projects"]')).toHaveAttribute('aria-current', 'location');
      await page.screenshot({ path: `test-results/editorial-${language}-${width}-full.png`, fullPage: true });
      if (width < 1024) {
        await page.locator('.menu-button').click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog')).toHaveCount(0);
        await expect(page.locator('.menu-button')).toBeFocused();
      }
      expect(errors).toEqual([]);
    });
  }
}
