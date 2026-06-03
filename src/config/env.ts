import { EnvUtils } from '../commons/env/EnvUtils';
import { loadEnv } from './load-env';

loadEnv();

function flag(value: string | undefined): boolean {
    return value === '1' || value === 'true';
}

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(
            `${name} is not set. Load .env.stage / .env.prod (see .env.example) or export ${name}.`,
        );
    }
    return value;
}

const envUtils = EnvUtils.getInstance();

export const env = {
    name: envUtils.getEnv(),
    isProd: envUtils.isProd(),
    isStage: envUtils.isStage(),
    uiBaseUrl: requireEnv('UI_BASE_URL'),
    apiBaseUrl: requireEnv('API_BASE_URL'),
    highlightActions: flag(process.env.HIGHLIGHT_ACTIONS),
};
