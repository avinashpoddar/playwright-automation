import type { Locator } from '@playwright/test';

export function firstVisible(locator: Locator): Locator {
    return locator.first();
}
