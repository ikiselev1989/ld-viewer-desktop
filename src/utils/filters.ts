import { ICONS, ITEM_LIMIT, LD_SITE_PATH, LD_STATIC_PATH, PLATFORMS_ICON } from '../constants';
import { CATEGORIES, PLATFORMS, SORT } from '../enums';
import { escapeRegExp } from './helpers';
import type { EntryNode } from '../types';

export default class Filters {
	static feedFilter(feed) {
		return feed.map((item) => {
			return item.id;
		});
	}

	static nodesFieldsFilter(nodes) {
		return nodes.map((item) => {
			let { id, name, meta, path, subsubtype, magic } = item;
			let links = [];

			Object.keys(meta).map((key) => {
				if (key !== '' && key.match(/^link-\d+$/)) {
					links.push([ICONS[meta[`${key}-tag`]], meta[key], meta[`${key}-name`], PLATFORMS_ICON[meta[`${key}-tag`]]]);
				}
			});

			return {
				id,
				name,
				magic,
				type: subsubtype,
				url: LD_SITE_PATH + path.replace('/^\//', ''),
				cover: meta.cover ? `${LD_STATIC_PATH}${meta.cover.replace('///', '')}.480x384.fit.jpg` : '/no-image.jpeg',
				sources: links,
			};
		});
	}

	static nodesPlatformsFilter(nodes, platforms: PLATFORMS[] = []) {
		if (platforms.length === 0) return nodes;

		return nodes.filter((node) => {
			if (platforms.length > 0) {
				const filteredLinks = node.sources.filter((item) => {
					return platforms.indexOf(item[3]) !== -1;
				});

				return filteredLinks.length !== 0;
			}

			return true;
		});
	}

	static nodesEventTypeFilter(nodes, type: CATEGORIES = CATEGORIES.ALL) {
		if (type === CATEGORIES.ALL) {
			return nodes;
		}

		return nodes.filter((node) => {
			return node.type === type.toLowerCase();
		});
	}

	static nodesSort(nodes: EntryNode[], sort: SORT = SORT.SMART): EntryNode[] {
		let sortedNodes: EntryNode[];

		switch (sort) {
			case SORT.CLASSIC:
				sortedNodes = nodes.sort((a, b) => a.magic.cool < b.magic.cool ? 1 : -1);
				break;
			case SORT.DANGER:
				sortedNodes = nodes.filter((node) => node.magic.grade < 20).sort((a, b) => a.magic.grade > b.magic.grade ? 1 : -1);
				break;
			case SORT.ZERO:
				sortedNodes = nodes.filter((node => node.magic.grade === 0));
				break;
			case SORT.FEEDBACK:
				sortedNodes = nodes.sort((a, b) => a.magic.given < b.magic.given ? 1 : -1);
				break;
			case SORT.GRADE:
				sortedNodes = nodes.sort(((a, b) => a.magic.grade < b.magic.grade ? 1 : -1));
				break;
			default:
				sortedNodes = nodes.sort((a, b) => a.magic.smart < b.magic.smart ? 1 : -1);
		}

		return sortedNodes;
	}

	static nodesPageFilter(nodes, page, perPage = ITEM_LIMIT) {
		return nodes.slice(perPage * page, perPage * page + perPage);
	}

	static nodesTitleFilter(nodes, title) {
		return nodes.filter((node) => {
			return new RegExp(escapeRegExp(title), 'gmi').test(node.name);
		});
	}

	static nodesFavoritesFilter(nodes, favorites) {
		return nodes.filter(({ id }) => favorites.includes(id));
	}

	static nodesVisitedFilter(nodes, favorites) {
		return nodes.filter(({ id }) => !favorites.includes(id));
	}
}
