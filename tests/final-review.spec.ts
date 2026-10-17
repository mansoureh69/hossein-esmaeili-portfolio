import { test, expect } from '@playwright/test';

for (const language of ['en', 'fa']) {
  for (const width of [360, 768, 1440]) {
    for (const reduced of [false, true]) {
      test(`final navigation ${language} ${width} reduced=${reduced}`, async ({ page }) => {
        test.setTimeout(60000);
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
        await page.addInitScript(lang => localStorage.setItem('hossein-portfolio-language', lang), language);
        await page.goto('/');
        await expect(page.locator('#hero-title')).toBeVisible();
        await expect(page.locator('.loader')).toHaveCount(0);
        await expect(page.locator('.header')).toHaveCSS('opacity', '1');
        await expect(page.locator('html')).toHaveAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
        const ids = ['home', 'about', 'projects', 'expertise', 'experience', 'contact'];
        for (const [index, id] of ids.entries()) {
          if (width < 1024) {
            await page.locator('.menu-button').click();
            await page.locator('.navigation-dialog nav button').nth(index).click();
            await expect(page.getByRole('dialog')).toHaveCount(0);
          } else if (id === 'contact') {
            await expect(page.locator('.header-contact')).toHaveAttribute('href', 'mailto:h.esmaeili1213@gmail.com');
            await page.locator('#contact').scrollIntoViewIfNeeded();
          } else {
            await page.locator(`.header nav a[href="#${id}"]`).click();
          }
          const heading = page.locator(`#${id} h1, #${id} h2`).first();
          await expect.poll(async () => {
            const box = await heading.boundingBox();
            const header = await page.locator('.header').boundingBox();
            return box !== null && header !== null && box.y >= header.y + header.height - 1 && box.y < 1000;
          }, { message: `${id} heading must be below the sticky header and visible`, timeout: 10000 }).toBe(true);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), id).toBe(true);
          if (reduced && language === 'fa') await page.screenshot({ path: `test-results/final-fa-${width}-${id}.png` });
        }
        for (const selector of ['.process-wrap', '.skills', '.footer']) {
          await page.locator(selector).scrollIntoViewIfNeeded();
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), selector).toBe(true);
          if (reduced && language === 'fa') await page.screenshot({ path: `test-results/final-fa-${width}-${selector.slice(1)}.png` });
        }
        if (reduced) {
          await expect(page.locator('.hero-image canvas')).toBeHidden();
          await page.locator('#expertise').scrollIntoViewIfNeeded();
          expect(await page.locator('video').evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
        }
        expect(errors).toEqual([]);
      });
    }
  }
}
