import dotenv from 'dotenv';
import path from 'path';

let loaded = false;

/**
 * Loads environment file (Allen pattern):
 * - PROD=1 → .env.prod
 * - otherwise → .env.stage
 */
export function loadEnv(): void {
    if (loaded) {
        return;
    }

    const envFile = getEnvFileName();
    const envPath = path.resolve(process.cwd(), envFile);

    dotenv.config({ path: envPath });
    loaded = true;

    if (process.env.CI !== '1') {
        console.log(`Loaded ${envFile} (environment: ${process.env.PROD === '1' ? 'prod' : 'stage'})`);
    }
}

export function getEnvFileName(): string {
    return process.env.PROD === '1' ? '.env.prod' : '.env.stage';
}
