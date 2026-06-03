import { LoginFlow } from '../flows/LoginFlow';
import { LoginPage } from '../pages/LoginPage';

/** UI entry points attached to a Playwright page (Allen: webPOMs + flows). */
export interface UIApp {
    readonly pages: {
        login: LoginPage;
    };
    readonly login: LoginFlow;
}
