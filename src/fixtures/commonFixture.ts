import { test as base } from '@playwright/test';

import { TestDataLoader } from '../commons/data/TestDataLoader';
import { env } from '../config/env';
import { UITestData } from '../data/models/UITestData';
import type { Environment } from '../commons/env/EnvUtils';

export type CommonWorkerFixtures = {
    environment: Environment;
    uiBaseUrl: string;
    apiBaseUrl: string;
    testData: UITestData;
};

export const commonTest = base.extend<{}, CommonWorkerFixtures>({
    environment: [env.name, { scope: 'worker' }],

    uiBaseUrl: [env.uiBaseUrl, { scope: 'worker' }],

    apiBaseUrl: [env.apiBaseUrl, { scope: 'worker' }],

    testData: [
        async ({}, use) => {
            const loader = new TestDataLoader();
            await use(await loader.loadUITestData());
        },
        { scope: 'worker' },
    ],
});
