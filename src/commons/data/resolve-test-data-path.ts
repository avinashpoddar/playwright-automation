import * as fs from 'fs';
import * as path from 'path';

import { EnvUtils } from '../env/EnvUtils';

/**
 * Resolves test-data path with env folder first
 * Falls back to shared test-data/... when env-specific file is absent.
 */
export function resolveTestDataPath(relativePath: string): string {
    const environment = EnvUtils.getInstance().getEnv();
    const envRelative = `${environment}/${relativePath}`;
    const envAbsolute = path.join(process.cwd(), 'test-data', envRelative);

    if (fs.existsSync(envAbsolute)) {
        return envRelative;
    }

    return relativePath;
}
