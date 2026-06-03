import type { Locator, Page } from '@playwright/test';

import { env } from '../../config/env';
import { flashHighlight } from './highlight';

type ClickOptions = Parameters<Locator['click']>[0];
type FillOptions = Parameters<Locator['fill']>[1];
type CheckOptions = Parameters<Locator['check']>[0];
type HoverOptions = Parameters<Locator['hover']>[0];
type SelectOption = Parameters<Locator['selectOption']>[0];
type SelectOptions = Parameters<Locator['selectOption']>[1];

/**
 * Wraps common locator actions with optional Selenium-style highlights (demos / debugging).
 */
export class HighlightedActions {
    constructor(
        private readonly page: Page,
        private readonly highlightEnabled: boolean = env.highlightActions,
    ) {}

    async click(locator: Locator, options?: ClickOptions): Promise<void> {
        await this.beforeAction(locator);
        await locator.click(options);
    }

    async fill(locator: Locator, value: string, options?: FillOptions): Promise<void> {
        await this.beforeAction(locator);
        await locator.fill(value, options);
    }

    async hover(locator: Locator, options?: HoverOptions): Promise<void> {
        await this.beforeAction(locator);
        await locator.hover(options);
    }

    async check(locator: Locator, options?: CheckOptions): Promise<void> {
        await this.beforeAction(locator);
        await locator.check(options);
    }

    async uncheck(locator: Locator, options?: CheckOptions): Promise<void> {
        await this.beforeAction(locator);
        await locator.uncheck(options);
    }

    async selectOption(
        locator: Locator,
        values: SelectOption,
        options?: SelectOptions,
    ): Promise<void> {
        await this.beforeAction(locator);
        await locator.selectOption(values, options);
    }

    get rawPage(): Page {
        return this.page;
    }

    private async beforeAction(locator: Locator): Promise<void> {
        if (this.highlightEnabled) {
            await flashHighlight(locator);
        }
    }
}
