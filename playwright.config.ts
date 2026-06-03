import { defineConfig, devices } from '@playwright/test';

import { loadEnv } from './src/config/load-env';

loadEnv();

export default defineConfig({
    timeout: 60_000,
    testDir: './tests',

    testIgnore: process.env.PROD === '1' ? [] : [/\.prod\.spec\.ts$/],

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless: process.env.CI === '1',
    },

    projects: [
        {
            /** Default project — matches Playwright UI / `--project=chromium` */
            name: 'chromium',
            testMatch: /tests\/.*/,
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.UI_BASE_URL,
            },
        },
        {
            name: 'ui',
            testMatch: /tests\/ui\/.*/,
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.UI_BASE_URL,
            },
        },
        {
            name: 'api',
            testMatch: /tests\/api\/.*/,
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
