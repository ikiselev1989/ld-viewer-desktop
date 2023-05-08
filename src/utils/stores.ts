import { derived, get, readable, writable } from 'svelte/store';
import type { Data, DataStore, Entry, Filters as IFilters, PaginationData, PaginationStore } from '../types';
import { CATEGORIES, SORT } from '../enums';
import CacheController from './cache';
import api from './api';
import { API_PATH, DEFAULT_FILTERS_STATE, MAX_NODES } from '../constants';
import { asyncForEach, chunkArray } from './helpers';
import Filters from './filters';

export const data: DataStore = (() => {
	const { set, subscribe } = writable<Data>();

	const getLastEvent = async (): Promise<number> => {
		const root = await api.get(`${API_PATH}node2/get/1`);
		const { meta } = root.node[0];
		const { featured } = meta;

		const { node } = await api.get(`${API_PATH}node2/get/${featured}`);
		const { slug } = node[0];

		return slug;
	};

	const getEventId = async (event: number): Promise<number> => {
		const { node_id } = await api.get(`${API_PATH}node2/walk/1/events/ludum-dare/${event}`);

		return node_id;
	};

	const getEventEntries = async (eventId: number): Promise<Entry[]> => {
		let list = [];

		let page = 0;

		const loop = async () => {
			const { feed } = await api.get(`${API_PATH}node/feed/${eventId}/parent/item/game/compo+jam+extra/?limit=50&offset=${page * 50}`);

			if (feed && feed.length > 0) {
				const feedIds = Filters.feedFilter(feed);

				list = [...list, ...feedIds];

				page++;

				if (feed.length === 50) {
					await loop();
				}
			}
		};

		await loop();

		let nodes = [];
		const promises = [];

		if (list && list.length > 0) {
			let feedsChunks = chunkArray(list, MAX_NODES);

			await asyncForEach(feedsChunks, async (feeds) => {
				promises.push(new Promise<void>(async (resolve) => {
					const { node } = await api.get(API_PATH + `node2/get/${feeds.join('+')}`);
					nodes = nodes.concat(Filters.nodesFieldsFilter(node));

					resolve();
				}));
			});
		}

		return await Promise.all(promises).then(() => {
			return nodes;
		});
	};

	const updateVisited = (event: number, visited: number[]) => {
		const dataStorage = get(data);
		dataStorage.visited[event] = visited;

		CacheController.setData(dataStorage);

		set(dataStorage);
	};

	const updateFavorites = (event: number, favorites: number[]) => {
		const dataStorage = get(data);
		dataStorage.favorites[event] = favorites;

		CacheController.setData(dataStorage);

		set(dataStorage);
	};

	return {
		subscribe,
		init: async () => {
			const lastEvent = await getLastEvent();
			const lastEventNodeId = await getEventId(lastEvent);
			const cache = await CacheController.getData();

			const eventsId = cache ? cache.eventsId : { [lastEvent]: lastEventNodeId };
			const entries = cache ? cache.entries : { [lastEvent]: await getEventEntries(lastEventNodeId) };
			const visited = cache ? cache.visited : {};
			const favorites = cache ? cache.favorites : {};

			const data: Data = {
				lastEvent,
				eventsId,
				entries,
				visited,
				favorites,
			};

			set(data);

			await CacheController.setData(data);
		},
		updateEventData: async (event) => {
			const eventId = await getEventId(event);
			const eventEntries = await getEventEntries(eventId);
			const dataStorage = get(data);

			dataStorage.eventsId = {
				...dataStorage.eventsId,
				[event]: eventId,
			};

			dataStorage.entries = {
				...dataStorage.entries,
				[event]: eventEntries,
			};

			set(dataStorage);

			await CacheController.setData(dataStorage);
		},
		flushEventData: async (event: number) => {
			const dataStorage = get(data);

			delete dataStorage.entries[event];

			set(dataStorage);

			await CacheController.setData(dataStorage);
		},
		isVisited: (event: number, id: number) => {
			const dataStorage = get(data);
			const visited = dataStorage.visited[event] || [];

			return visited.includes(id);
		},
		addVisited: (event: number, id: number) => {
			const dataStorage = get(data);
			const visited = dataStorage.visited[event] || [];

			visited.push(id);

			updateVisited(event, visited);
		},
		addFavorite: (event: number, id: number) => {
			const dataStorage = get(data);
			const favorites = dataStorage.favorites[event] || [];

			favorites.push(id);

			updateFavorites(event, favorites);
		},
		removeFavorite: (event: number, id: number) => {
			const dataStorage = get(data);
			let favorites = dataStorage.favorites[event] || [];

			favorites = favorites.filter(fv => fv != id);

			updateFavorites(event, favorites);
		},
	};
})();

export const modalsState = writable({
	about: false,
	loader: false,
	filters: false,
	search: false,
	startScreen: true,
});

export const last5Events = derived(data, ($data) => {
	const events: number[] = [];

	if (!$data) return events;

	const lastEvent = $data.lastEvent;

	for (let i = 0; i < 5; i++) {
		const eventNumber: number = parseInt(lastEvent.toString()) - i;

		if (eventNumber > 0) {
			events.push(eventNumber);
		}
	}

	return events;
});

export const eventGames = writable([]);

export const gamesList = writable([]);

export const types = readable<CATEGORIES[]>([CATEGORIES.ALL, CATEGORIES.COMPO, CATEGORIES.JAM, CATEGORIES.EXTRA]);
export const sort_types = readable<SORT[]>([SORT.SMART, SORT.CLASSIC, SORT.DANGER, SORT.ZERO, SORT.FEEDBACK, SORT.GRADE]);

export const filters = writable<IFilters>(DEFAULT_FILTERS_STATE);

export const event = writable<number>();

export const pagination: PaginationStore = (() => {
	const { update, set, subscribe } = writable<PaginationData>({
		page: 0,
		maxPage: 0,
	});

	return {
		set,
		subscribe,
		first: () => update(pag => {
			pag.page = 0;
			return pag;
		}),
		last: () => update(pag => {
			pag.page = pag.maxPage;
			return pag;
		}),
		next: () => update(pag => {
			pag.page = pag.page + 1;
			return pag;
		}),
		prev: () => update(pag => {
			pag.page = pag.page - 1;
			return pag;
		}),
	};
})();

export const busy = writable(false);
