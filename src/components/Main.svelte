<script lang='ts'>
	import { Svroller } from 'svrollbar';
	import { gamesList, modalsState } from '../utils/stores';
	import Loader from './Loader.svelte';
	import Card from '../partials/Card.svelte';

	let viewport: Element;
	let contents: Element;
</script>

<section class='list'>
	{#if $modalsState.loader}
		<Loader />
	{/if}

	{#if !$gamesList.length}
		<div
			class='[ text-2xl p-4 absolute inset-0 flex flex-col justify-center items-center text-center text-gray-200 bg-gray-600 z-10 ]'>
			<span class='[ mb-2 ]'>Games not found.</span>
			<span class='[ text-sm ]'>Select another event or refresh this one.</span>
		</div>
	{/if}

	{#if $gamesList.length}
		<div class='[ w-full h-full absolute inset-0 ]'>
			<Svroller width='100%' height='100%' alwaysVisible='{true}'>
				<div class='list__container [ mx-auto container items-stretch ]' bind:this={viewport}>
					<div class='content' bind:this={contents}>
						{#each $gamesList as card}
							<Card {...card} />
						{/each}
					</div>
				</div>
			</Svroller>
		</div>
	{/if}
</section>

<style lang='scss'>
  .list {
    @apply w-full h-full py-16 relative flex flex-col box-border;

    .list__container {
      @apply pt-4 pb-4;
    }

    .content {
      @apply grid grid-cols-4 lg:grid-cols-5 gap-4;
    }
  }
</style>
