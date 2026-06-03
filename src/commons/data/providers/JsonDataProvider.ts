import * as fs from 'fs/promises';
import * as path from 'path';

import { IDataProvider } from '../contracts/IDataProvider';

export class JsonDataProvider<T> implements IDataProvider<T> {

    async load(relativePath: string): Promise<T> {
        const filePath = path.resolve(process.cwd(), 'test-data', relativePath);
        const raw = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(raw) as T;
    }
}
