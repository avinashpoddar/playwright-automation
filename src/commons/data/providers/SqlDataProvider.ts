import * as fs from 'fs/promises';
import * as path from 'path';

import { IDataProvider } from '../contracts/IDataProvider';

type SqlRow = Record<string, unknown>;

export class SqlDataProvider implements IDataProvider<SqlRow[]> {

    async load(relativeSqlPath: string): Promise<SqlRow[]> {
        const host = process.env.DB_HOST;
        const user = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const database = process.env.DB_NAME;

        if (!host || !user || !database) {
            throw new Error(
                'SQL data source requires DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME in .env'
            );
        }

        const sqlPath = path.resolve(process.cwd(), 'test-data', relativeSqlPath);
        const query = (await fs.readFile(sqlPath, 'utf-8')).trim();

        const mysql = await import('mysql2/promise');
        const connection = await mysql.createConnection({
            host,
            port: Number(process.env.DB_PORT ?? 3306),
            user,
            password,
            database,
        });

        try {
            const [rows] = await connection.query(query);
            return rows as SqlRow[];
        } finally {
            await connection.end();
        }
    }
}
