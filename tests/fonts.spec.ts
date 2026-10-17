import { test, expect } from '@playwright/test';

for (const language of ['en', 'fa']) {
  for (const width of [360, 1440]) {
    test(`local fonts and stable layout ${language} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const fontRequests: string[] = [];
      const externalFontRequests: string[] = [];
      page.on('request', request => {
        const url = request.url();
        if (request.resourceType() === 'font') fontRequests.push(url);
        if (/fonts\.(googleapis|gstatic)\.com/.test(url)
          || (request.resourceType() === 'font' && new URL(url).origin !== 'http://127.0.0.1:5173')) externalFontRequests.push(url);
      });
      await page.addInitScript(lang => {
        localStorage.setItem('hossein-portfolio-language', lang);
        (window as any).fontLayoutShifts = [];
        new PerformanceObserver(list => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) (window as any).fontLayoutShifts.push(entry.value);
          }
        }).observe({ type: 'layout-shift', buffered: true });
      }, language);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('.loader')).toHaveCount(0);
      const family = language === 'fa' ? 'Vazirmatn Variable' : 'Onest Variable';
      await expect(page.locator('body')).toHaveCSS('font-family', new RegExp(family));
      expect(await page.evaluate(font => [...document.fonts].some(face => face.family.includes(font) && face.status === 'loaded'), family)).toBe(true);
      expect(fontRequests.length).toBeGreaterThan(0);
      expect(externalFontRequests).toEqual([]);
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const shifts: number[] = await page.evaluate(() => (window as any).fontLayoutShifts);
      expect(shifts.reduce((sum, value) => sum + value, 0)).toBe(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}
