import { LoginCredentials } from '../../../data/models/LoginCredentials';

export class EnvDataProvider {

    static getLoginCredentials(): LoginCredentials {
        return {
            scenario: 'env-default',
            username: process.env.ADMIN_USERNAME ?? '',
            password: process.env.ADMIN_PASSWORD ?? '',
            expectedUrlPattern: process.env.ADMIN_EXPECTED_URL ?? '/admin',
        };
    }
}
