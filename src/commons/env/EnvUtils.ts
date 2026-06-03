export type Environment = 'stage' | 'prod';

export class EnvUtils {
    private static instance: EnvUtils;
    private readonly environment: Environment;

    private constructor() {
        this.environment = process.env.PROD === '1' ? 'prod' : 'stage';
    }

    static getInstance(): EnvUtils {
        if (!EnvUtils.instance) {
            EnvUtils.instance = new EnvUtils();
        }
        return EnvUtils.instance;
    }

    isProd(): boolean {
        return this.environment === 'prod';
    }

    isStage(): boolean {
        return this.environment === 'stage';
    }

    getEnv(): Environment {
        return this.environment;
    }

    static get isCI(): boolean {
        return process.env.CI === '1';
    }
}
