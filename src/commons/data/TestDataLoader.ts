import { LoginCredentials } from '../../data/models/LoginCredentials';
import { UITestData } from '../../data/models/UITestData';
import { resolveTestDataPath } from './resolve-test-data-path';
import { DataSourceType } from './DataSourceType';
import { CsvDataProvider } from './providers/CsvDataProvider';
import { EnvDataProvider } from './providers/EnvDataProvider';
import { ExcelDataProvider } from './providers/ExcelDataProvider';
import { JsonDataProvider } from './providers/JsonDataProvider';
import { SqlDataProvider } from './providers/SqlDataProvider';

export class TestDataLoader {

    private readonly csv = new CsvDataProvider();
    private readonly sql = new SqlDataProvider();
    private readonly excel = new ExcelDataProvider();

    async loadUITestData(): Promise<UITestData> {
        const source = (process.env.UI_TEST_DATA_SOURCE ?? DataSourceType.CSV) as DataSourceType;
        const loginScenarios = await this.loadLoginScenarios(source);

        if (!loginScenarios.length) {
            return {
                login: EnvDataProvider.getLoginCredentials(),
                loginScenarios: [EnvDataProvider.getLoginCredentials()],
            };
        }

        return {
            login: loginScenarios[0],
            loginScenarios,
        };
    }

    async loadLoginScenarios(source: DataSourceType): Promise<LoginCredentials[]> {
        switch (source) {
            case DataSourceType.JSON:
                return this.loadLoginFromJson();
            case DataSourceType.SQL:
                return this.loadLoginFromSql();
            case DataSourceType.EXCEL:
                return this.loadLoginFromExcel();
            case DataSourceType.ENV:
                return [EnvDataProvider.getLoginCredentials()];
            case DataSourceType.CSV:
            default:
                return this.loadLoginFromCsv();
        }
    }

    private async loadLoginFromCsv(): Promise<LoginCredentials[]> {
        const rows = await this.csv.load(resolveTestDataPath('ui/login.csv'));
        return rows.map(this.mapLoginRow);
    }

    private async loadLoginFromJson(): Promise<LoginCredentials[]> {
        const provider = new JsonDataProvider<LoginCredentials[]>();
        return provider.load(resolveTestDataPath('ui/login.json'));
    }

    private async loadLoginFromExcel(): Promise<LoginCredentials[]> {
        const rows = await this.excel.load(resolveTestDataPath('ui/login.xlsx'));
        return rows.map(this.mapLoginRow);
    }

    private async loadLoginFromSql(): Promise<LoginCredentials[]> {
        const rows = await this.sql.load(resolveTestDataPath('sql/login-credentials.sql'));
        return rows.map((row) => ({
            scenario: String(row.scenario ?? row.SCENARIO ?? 'sql'),
            username: String(row.username ?? row.USERNAME ?? ''),
            password: String(row.password ?? row.PASSWORD ?? ''),
            expectedUrlPattern: String(row.expected_url_pattern ?? row.EXPECTED_URL_PATTERN ?? '/admin'),
        }));
    }

    private mapLoginRow(row: Record<string, string>): LoginCredentials {
        return {
            scenario: row.scenario,
            username: row.username,
            password: row.password,
            expectedUrlPattern: row.expectedUrlPattern ?? '/admin',
        };
    }
}
