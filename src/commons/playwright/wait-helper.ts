import type { Page } from '@playwright/test';

export async function waitForDomReady(page: Page): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
}
