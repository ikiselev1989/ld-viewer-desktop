import { ICONS, ITEM_LIMIT, LD_SITE_PATH, LD_STATIC_PATH, PLATFORMS_ICON } from '../constants';
import { CATEGORIES, PLATFORMS } from '../enums';

export default class Filters {
	static feedFilter(feed) {
		return feed.map((item) => {
			return item.id;
		});
	}

	static nodesFieldsFilter(nodes) {
		return nodes.map((item) => {
			let { id, name, meta, path, subsubtype } = item;
			let links = [];

			Object.keys(meta).map((key) => {
				if (key !== '' && key.match(/^link-\d+$/)) {
					links.push([ICONS[meta[`${key}-tag`]], meta[key], meta[`${key}-name`], PLATFORMS_ICON[meta[`${key}-tag`]]]);
				}
			});

			return {
				id,
				name,
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

	static nodesPageFilter(nodes, page, perPage = ITEM_LIMIT) {
		return nodes.slice(perPage * page, perPage * page + perPage);
	}

	static nodesTitleFilter(nodes, title) {
		return nodes.filter((node) => {
			return new RegExp(title, 'gmi').test(node.name);
		});
	}

	static nodesFavoritesFilter(nodes, favorites) {
		return nodes.filter(({ id }) => favorites.includes(id));
	}

	static nodesVisitedFilter(nodes, favorites) {
		return nodes.filter(({ id }) => !favorites.includes(id));
	}
}
