import { test, expect } from '@playwright/test';

function contrast(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
      const channel = value / 255;
      return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
    });
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => a - b);
  return (values[1] + .05) / (values[0] + .05);
}

for (const language of ['en', 'fa']) {
  for (const width of [360, 768, 1440]) {
    test(`readable text ${language} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(lang => localStorage.setItem('hossein-portfolio-language', lang), language);
      await page.goto('/');
      await expect(page.locator('.loader')).toHaveCount(0);
      await expect(page.locator('.header')).toHaveCSS('opacity', '1');
      await page.evaluate(() => document.fonts.ready);
      const smallText = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('body *')]
        .filter(el => !el.closest('svg,.sr-only,.sb-sr') && el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
          && [...el.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
          && parseFloat(getComputedStyle(el).fontSize) < 12)
        .map(el => `${el.className}: ${el.textContent?.trim()}`));
      expect(smallText).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [selector, surface] of [
        ['.visual-caption span', 'body'], ['.timeline-date', 'body'],
        ['.secondary-action>span', 'body'], ['.process-line', '.process-wrap'],
        ['.hero-image-label', '.hero-image-label'],
      ]) {
        const color = await page.locator(selector).first().evaluate(el => getComputedStyle(el).color);
        const background = await page.locator(surface).first().evaluate(el => getComputedStyle(el).backgroundColor);
        expect(contrast(color, background), selector).toBeGreaterThanOrEqual(4.5);
      }
      await page.locator('.social-telegram').hover();
      const telegram = await page.locator('.social-telegram').evaluate(el => {
        const style = getComputedStyle(el);
        return { color: style.color, background: style.backgroundColor };
      });
      expect(contrast(telegram.color, telegram.background)).toBeGreaterThanOrEqual(4.5);
      if (width < 1024) {
        await page.locator('.menu-button').click();
        const color = await page.locator('.nav-brand .brand-caption').evaluate(el => getComputedStyle(el).color);
        expect(contrast(color, 'rgb(238, 224, 214)')).toBeGreaterThanOrEqual(4.5);
        expect(await page.locator('.dialog-panel').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      }
    });
  }
}
