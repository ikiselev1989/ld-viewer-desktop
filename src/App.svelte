<script lang='ts'>
	import { appWindow } from '@tauri-apps/api/window';
	import Header from './components/Header.svelte';
	import Main from './components/Main.svelte';
	import { busy, data, event, eventGames, filters, gamesList, modalsState, pagination } from './utils/stores';
	import { onMount } from 'svelte';
	import FiltersUtils from './utils/filters';
	import About from './components/About.svelte';
	import Filters from './components/Filters.svelte';
	import Pagination from './partials/Pagination.svelte';
	import VersionInformer from './components/VersionInformer.svelte';
	import StartScreen from './components/StartScreen.svelte';
	import CacheController from './utils/cache';
	import { maxPage, wait } from './utils/helpers';

	const updateEntriesList = async () => {
		$busy = true;
		$modalsState.loader = true;
		$modalsState.search = $filters.search && $filters.search.length >= 3;

		if (!$data.entries[$event]) await data.updateEventData($event);

		filterEntriesList();

		$busy = false;
		$modalsState.loader = false;
	};

	const filterEntriesList = () => {
		const searchEnabled = $filters.search && $filters.search.length >= 3;

		$eventGames = FiltersUtils.nodesEventTypeFilter($data.entries[$event], $filters.category);

		let filteredList = $eventGames;

		if ($filters.platforms.length !== 0) {
			filteredList = FiltersUtils.nodesPlatformsFilter(filteredList, $filters.platforms);
		}

		if (searchEnabled) {
			filteredList = FiltersUtils.nodesTitleFilter(filteredList, $filters.search);
		}

		if ($filters.onlyFavorites) {
			filteredList = FiltersUtils.nodesFavoritesFilter(filteredList, $data.favorites[$event] || []);
		}

		if (!$filters.onlyFavorites && $filters.hideVisited) {
			filteredList = FiltersUtils.nodesVisitedFilter(filteredList, $data.visited[$event] || []);
		}

		if (!searchEnabled && !$filters.onlyFavorites) {
			$pagination.maxPage = maxPage(filteredList);
			filteredList = FiltersUtils.nodesPageFilter(filteredList, $pagination.page);
		}

		$gamesList = filteredList;
	};

	const closeSearch = () => {
		$modalsState.search = false;
		$filters.search = '';
	};

	const modalAboutToggle = () => $modalsState.about = !$modalsState.about;

	const refreshEntriesList = () => {
		data.flushEventData($event);
		pagination.first();
		updateEntriesList();
	};

	const modalSearchToggle = () => {
		if ($modalsState.search) return closeSearch();

		$modalsState.search = true;
	};

	const modalFiltersToggle = () => $modalsState.filters = !$modalsState.filters;

	const scrollToTop = () => {
		let scroller = document.querySelector('.list .svlr-viewport');

		scroller && scroller.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};

	const disableSomeButtons = () => {
		if (location.host !== 'tauri.localhost') return;

		document.addEventListener('contextmenu', event => event.preventDefault());

		document.addEventListener('keydown', e => {
			if (e.key === 'F5' || e.key === 'F12') {
				e.preventDefault();
			}
		});
	};

	onMount(async () => {
		await data.init();
		const lastFiltersState = await CacheController.getLastFiltersState();

		if (lastFiltersState) {
			$filters = lastFiltersState.filters;
			$event = parseInt(lastFiltersState.event.toString());
		} else {
			$event = parseInt($data.lastEvent.toString());
		}

		event.subscribe(() => {
			pagination.first();
			updateEntriesList();
			CacheController.setLastState($filters, $event);
		});

		filters.subscribe(() => {
			pagination.first();
			filterEntriesList();
			CacheController.setLastState($filters, $event);
		});

		await updateEntriesList();
		await appWindow.show();
		await wait(1000);

		disableSomeButtons();

		$modalsState.startScreen = false;
	});
</script>

{#if $modalsState.startScreen}
	<StartScreen />
{/if}

<div class='app [ bg-gray-600 ]'>
	<Header
		on:modalAboutToggle={modalAboutToggle}
		on:modalFiltersToggle={modalFiltersToggle}
		on:modalSearchToggle={modalSearchToggle}
		on:refreshEntriesList={refreshEntriesList}
	/>

	<Main />

	<About />

	<Filters />

	<Pagination on:pageChanged={()=>{filterEntriesList();scrollToTop();}} />

	<VersionInformer />
</div>

<style global lang='scss'>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css');

  @font-face {
    font-family: LudumDairy;
    src: url('./assets/Ludum-Dairy.ttf');
    font-weight: 400;
    font-style: normal;
  }

  body {
    overflow: hidden;
  }

  .app {
    @apply grid h-screen;
    grid-template-rows: min-content auto min-content;
  }

  .container {
    @apply px-4 box-border;
    max-width: 1080px;
  }

  * {
    user-select: none !important;
  }
</style>
