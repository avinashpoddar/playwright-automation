import * as path from 'path';

import { IDataProvider } from '../contracts/IDataProvider';

export type ExcelRow = Record<string, string>;

export class ExcelDataProvider implements IDataProvider<ExcelRow[]> {

    async load(relativePath: string): Promise<ExcelRow[]> {
        const filePath = path.resolve(process.cwd(), 'test-data', relativePath);
        const xlsx = await import('xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json<ExcelRow>(sheet, { defval: '' });
        return rows;
    }
}
