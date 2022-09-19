<script lang='ts'>
	import { fly } from '../transitions';
	import { busy, filters, modalsState, types } from '../utils/stores';
	import Select from '../partials/Select.svelte';
	import Checkbox from '../partials/Checkbox.svelte';
	import { PLATFORMS } from '../enums';

	const changeType = e => {
		$filters.category = $types[e.detail.value];
	};

	const changePlatformFilter = (value: boolean, platform: PLATFORMS) => {
		if (value) $filters.platforms = [...$filters.platforms, platform];

		if (!value) $filters.platforms = $filters.platforms.filter(pl => pl !== platform);
	};
</script>

{#if $modalsState.filters}
	<div class='[ p-5 pt-24 fixed inset-y-0 right-0 grid auto-rows-min gap-y-4 bg-gray-400 box-border z-20 ]'
			 transition:fly={{opacity:1, x:'100%'}} data-disabled='{$busy}'>
		<label class='[ flex items-center ]'>
			<span class='[ font-bold text-white ]'>Category:</span>
			<div class='w-20 ml-4'>
				<Select bind:value={$filters.category} options={$types} on:change={changeType} />
			</div>
		</label>

		<label class='[ w-full flex items-center cursor-pointer ]' data-disabled='{$filters.hideVisited}'>
			<span class='[ font-bold text-white grow ]'>Only favorites:</span>
			<div class=''>
				<Checkbox bind:value={$filters.onlyFavorites} />
			</div>
		</label>

		<label class='[ w-full flex items-center cursor-pointer ]' data-disabled='{$filters.onlyFavorites}'>
			<span class='[ font-bold text-white grow ]'>Hide visited:</span>
			<div class=''>
				<Checkbox bind:value={$filters.hideVisited} />
			</div>
		</label>

		<div>
			<div class='[ w-full mb-2 ]'>
				<span class='[ font-bold text-white grow ]'>Platforms:</span>
			</div>

			<div class='[ flex flex-col ]'>
				<label class='[ w-full flex items-center cursor-pointer ]'>
					<div>
						<Checkbox value='{$filters.platforms.includes(PLATFORMS.HTML5)}'
											on:change={(e)=>changePlatformFilter(e.target.checked, PLATFORMS.HTML5)} />
					</div>
					<span class='[ ml-2 font-bold text-white grow ]'>HTML5</span>
				</label>

				<label class='[ w-full flex items-center cursor-pointer ]'>
					<div>
						<Checkbox value='{$filters.platforms.includes(PLATFORMS.WIN)}'
											on:change={(e)=>changePlatformFilter(e.target.checked, PLATFORMS.WIN)} />
					</div>
					<span class='[ ml-2 font-bold text-white grow ]'>Win</span>
				</label>

				<label class='[ w-full flex items-center cursor-pointer ]'>
					<div>
						<Checkbox value='{$filters.platforms.includes(PLATFORMS.MACOS)}'
											on:change={(e)=>changePlatformFilter(e.target.checked, PLATFORMS.MACOS)} />
					</div>
					<span class='[ ml-2 font-bold text-white grow ]'>MacOS</span>
				</label>

				<label class='[ w-full flex items-center cursor-pointer ]'>
					<div>
						<Checkbox value='{$filters.platforms.includes(PLATFORMS.LINUX)}'
											on:change={(e)=>changePlatformFilter(e.target.checked, PLATFORMS.LINUX)} />
					</div>
					<span class='[ ml-2 font-bold text-white grow ]'>Linux</span>
				</label>
			</div>
		</div>
	</div>
{/if}

<style lang='scss'>
  *[data-disabled="true"] {
    @apply opacity-30 pointer-events-none;
  }
</style>
