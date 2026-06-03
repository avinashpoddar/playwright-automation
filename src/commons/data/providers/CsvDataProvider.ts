import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { IDataProvider } from '../contracts/IDataProvider';

export type CsvRow = Record<string, string>;

export class CsvDataProvider implements IDataProvider<CsvRow[]> {

    async load(relativePath: string): Promise<CsvRow[]> {
        const filePath = path.resolve(process.cwd(), 'test-data', relativePath);
        const results: CsvRow[] = [];
        let headers: string[] = [];

        await new Promise<void>((resolve, reject) => {
            const stream = fs.createReadStream(filePath);
            const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

            rl.on('line', (line) => {
                if (!line.trim()) {
                    return;
                }

                if (headers.length === 0) {
                    headers = line.split(',').map((h) => h.trim());
                    return;
                }

                const values = line.split(',').map((v) => v.trim());
                const row: CsvRow = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] ?? '';
                });
                results.push(row);
            });

            rl.on('close', () => resolve());
            rl.on('error', reject);
            stream.on('error', reject);
        });

        return results;
    }
}
