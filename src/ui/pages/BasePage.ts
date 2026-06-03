import type { Page } from '@playwright/test';

import { HighlightedActions } from '../../commons/playwright';
import { waitForDomReady } from '../../commons/playwright/wait-helper';

export abstract class BasePage {
    protected readonly actions: HighlightedActions;

    constructor(protected readonly page: Page) {
        this.actions = new HighlightedActions(page);
    }

    protected async goto(path: string): Promise<void> {
        await this.page.goto(path);
    }

    protected async waitForShell(): Promise<void> {
        await waitForDomReady(this.page);
    }
}
