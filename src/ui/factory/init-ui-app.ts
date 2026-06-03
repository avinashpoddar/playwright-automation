import { Page } from '@playwright/test';

import { LoginFlow } from '../flows/LoginFlow';
import { UIApp } from '../interfaces/UIApp';
import { initPages } from './init-pages';

export function initUIApp(page: Page): UIApp {
    const pages = initPages(page);

    return {
        pages,
        login: new LoginFlow(pages.login),
    };
}
