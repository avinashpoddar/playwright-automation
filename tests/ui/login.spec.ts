import { test, expect } from '../../src/fixtures/uiFixture';

for (const runMode of ['primary', 'all-scenarios'] as const) {
    const title =
        runMode === 'primary'
            ? 'Verify Admin is able to login successfully'
            : 'Execute each login scenario from test data';

    test(title, async ({ adminApp, testData, page, environment }) => {
        const scenarios =
            runMode === 'primary' ? [testData.login] : testData.loginScenarios;

        for (const login of scenarios) {
            await test.step(`[${environment}] ${login.scenario}`, async () => {
                await adminApp.login.loginAs(login.username, login.password);
                await expect(page).toHaveURL(new RegExp(login.expectedUrlPattern));
            });
        }
    });
}
