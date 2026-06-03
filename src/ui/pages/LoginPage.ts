import type { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Log In" });
    }

    async navigate(): Promise<void> {
        await this.goto('/admin/login/?next=/admin/');
    }

    async loginAs(username: string, password: string): Promise<void> {
        await this.navigate();
        await this.actions.fill(this.username, username);
        await this.actions.fill(this.password, password);
        await this.actions.click(this.loginButton);
    }
}
