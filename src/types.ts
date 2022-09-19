import type { Readable } from 'svelte/store';
import type { CATEGORIES, PLATFORMS } from './enums';

export interface Data {
	lastEvent: number,
	eventsId: { [key: number]: number },
	entries: { [key: number]: Entry[] },
	visited: { [key: number]: number[] }
	favorites: { [key: number]: number[] }
}

export interface PaginationData {
	page: number,
	maxPage: number
}

export interface Entry {
	id: number
	name: string
	type: string,
	url: string,
	cover: string,
	sources: string[][],
}

export interface DataStore extends Readable<Data> {
	init: () => Promise<void>
	updateEventData: (event: number) => Promise<void>
	flushEventData: (event: number) => void
	isVisited: (event: number, id: number) => void
	addVisited: (event: number, id: number) => void
	addFavorite: (event: number, id: number) => void
	removeFavorite: (event: number, id: number) => void
}

export interface PaginationStore extends Readable<PaginationData> {
	first: () => void
	next: () => void
	prev: () => void
	last: () => void
}

export interface Filters {
	category: CATEGORIES,
	platforms: PLATFORMS[],
	search: string,
	onlyFavorites: boolean,
	hideVisited: boolean,
}
