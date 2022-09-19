import type { Data, Filters } from '../types';
import { Store } from 'tauri-plugin-store-api';

const store = new Store('.cache.dat');

export default class CacheController {
	private static mainStorageName = 'LDViewerData';
	private static lastStateStorageName = 'LDViewerLastFiltersState';

	static getData = async (): Promise<Data | null> => {
		const data = await store.get<string>(`${this.mainStorageName}`);

		return data ? <Data>JSON.parse(data) : null;
	};

	static setData = (data: Data): Promise<void> => {
		return store.set(`${this.mainStorageName}`, JSON.stringify(data));
	};

	static getLastFiltersState = async (): Promise<{ filters: Filters, event: number } | null> => {
		const data = await store.get<string>(`${this.lastStateStorageName}`);

		return data ? JSON.parse(data) : null;
	};

	static setLastState = (filters: Filters, event: number): Promise<void> => {
		return store.set(`${this.lastStateStorageName}`, JSON.stringify({
			filters,
			event,
		}));
	};
}
