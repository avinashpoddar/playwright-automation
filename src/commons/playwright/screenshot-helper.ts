import type { Page } from '@playwright/test';

export async function captureFullPage(page: Page, path: string): Promise<void> {
    await page.screenshot({ path, fullPage: true });
}
