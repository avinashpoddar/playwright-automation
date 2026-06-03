import { initUIApp } from '../ui/factory/init-ui-app';
import { UIApp } from '../ui/interfaces/UIApp';
import { commonTest } from './commonFixture';

type UIFixture = {
    adminApp: UIApp;
};

export const test = commonTest.extend<UIFixture>({
    adminApp: async ({ page }, use) => {
        await use(initUIApp(page));
    },
});

export { expect } from '@playwright/test';
