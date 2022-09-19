import { ITEM_LIMIT } from '../constants';

export const maxPage = (nodes, perPage = ITEM_LIMIT) => {
	return Math.ceil(nodes.length / perPage) - 1;
};

export const chunkArray = (arr, size) => {
	return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
		arr.slice(i * size, i * size + size),
	);
};

export const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const wait = async (duration: number): Promise<void> => {
	const now = performance.now();

	return new Promise((resolve) => {
		requestAnimationFrame(function loop(time) {
			let elapsed = time - now;

			if (elapsed < duration) {
				requestAnimationFrame(loop);
			} else {
				resolve();
			}
		});
	});
};
