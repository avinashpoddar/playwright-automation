import { ApiClient } from '../api/client/ApiClient';
import { ApiFactory } from '../api/client/ApiFactory';
import { commonTest } from './commonFixture';

type ApiFixture = {
    apiFactory: ApiFactory;
};

function normalizeBaseUrl(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
}

export const test = commonTest.extend<ApiFixture>({
    apiFactory: async ({ playwright, apiBaseUrl }, use) => {
        const request = await playwright.request.newContext({
            baseURL: normalizeBaseUrl(apiBaseUrl),
        });

        try {
            await use(new ApiFactory(new ApiClient(request)));
        } finally {
            await request.dispose();
        }
    },
});

export { expect } from '@playwright/test';
