import { LoginPage } from '../pages/LoginPage';

export class LoginFlow {
    constructor(private readonly loginPage: LoginPage) {}

    async loginAs(username: string, password: string): Promise<void> {
        await this.loginPage.loginAs(username, password);
    }
}
