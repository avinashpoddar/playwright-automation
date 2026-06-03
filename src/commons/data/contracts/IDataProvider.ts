export interface IDataProvider<T> {
    load(source: string): Promise<T>;
}
