<script>
	import { fade } from 'svelte/transition';
	import { busy, event, filters, last5Events, modalsState } from '../utils/stores';
	import { createEventDispatcher } from 'svelte';
	import Search from '../partials/Search.svelte';
	import Select from '../partials/Select.svelte';
	import { CATEGORIES } from '../enums';

	const dispatch = createEventDispatcher();

	let filtered = false;

	filters.subscribe(val => {
		filtered = false;

		Object.keys(val).map(key => {
			switch (typeof val[key]) {
				case 'string':
					filtered = filtered || (val[key].length >= 3 && val[key] !== CATEGORIES.ALL);
					break;

				case 'boolean':
					filtered = filtered || val[key];
					break;

				case 'number':
					filtered = filtered || val[key] > 0;
					break;

				case 'object':
					filtered = filtered || val[key].length > 0;
					break;

				default:
					return;
			}
		});
	});
</script>

<div class='header'>
	<div class='[ flex items-center cursor-pointer ]' on:click={()=>dispatch('modalAboutToggle')}>
		<div class='logo'>
			{#each ['L', 'D', 'Viewer'] as word}
				<span>{word}</span>
			{/each}
		</div>

		<div class='about [ ml-2 ]'>
			<i class='fas fa-info-circle'></i>
		</div>
	</div>

	<div class='[ relative flex grow justify-center items-center ]'>
		{#if !$modalsState.search}
			<div class='[ flex items-center absolute m-auto ]' transition:fade={{duration:150}}>
				<div class='refresh-button' data-disabled={$busy} on:click={()=>dispatch('refreshEntriesList')}>
					<i class='fas fa-sync-alt'></i>
				</div>
				<div class='[ w-40 ]'>
					<Select bind:value={$event} options={$last5Events} prefix='Ludum Dare #' disabled={$busy} />
				</div>
			</div>
		{/if}

		{#if $modalsState.search}
			<Search bind:value={$filters.search} on:click={()=>dispatch('modalSearchToggle')} />
		{/if}
	</div>

	<div class='buttons [ flex ]'>
		<div class='[ text-white cursor-pointer ]' data-disabled='{$busy}' data-open='{$modalsState.search}'
				 on:click={()=>dispatch('modalSearchToggle')}>
			<i class='fas fa-search'></i>
		</div>
		<div class='[ ml-6 relative text-white cursor-pointer ]' data-disabled='{$busy}' data-open='{$modalsState.filters}'
				 on:click={()=>dispatch('modalFiltersToggle')}>
			<i class='fas fa-filter'></i>
			{#if filtered}
			<span
				class='[ w-2 h-2 absolute -top-1 -right-1 flex justify-center items-center rounded-full bg-orange-500 drop-shadow-lg ]'></span>
			{/if}
		</div>
	</div>
</div>

<style lang='scss'>
  .header {
    @apply h-16 px-5 flex justify-between items-center font-mono bg-gray-800 z-30;

    [data-open="true"] {
      @apply text-orange-600;
    }
  }

  .refresh-button {
    @apply mr-4 text-white cursor-pointer;

    &[data-disabled="true"] {
      @apply text-orange-600 pointer-events-none;
    }
  }

  .logo {
    @apply text-2xl;
    font-family: LudumDairy, serif;

    > span:nth-child(1) {
      @apply text-orange-600;
    }

    > span:nth-child(2) {
      @apply text-orange-500;
    }

    > span:nth-child(3) {
      @apply text-white;
    }
  }

  .about {
    @apply text-white;
  }

  .buttons {
    > *[data-disabled="true"] {
      @apply text-gray-500 pointer-events-none;
    }
  }
</style>
