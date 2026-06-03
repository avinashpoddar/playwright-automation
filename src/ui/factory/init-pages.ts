import { Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

/** Page object registry */
export function initPages(page: Page) {
    return {
        login: new LoginPage(page),
    };
}

export type Pages = ReturnType<typeof initPages>;
