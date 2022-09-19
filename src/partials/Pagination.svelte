<script lang='ts'>
	import { busy, filters, gamesList, pagination } from '../utils/stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const getFirstPage = () => {
		pagination.first();
		dispatch('pageChanged');
	};

	const getNext = () => {
		pagination.next();
		dispatch('pageChanged');
	};

	const getPrev = () => {
		pagination.prev();
		dispatch('pageChanged');
	};

	const getLast = () => {
		pagination.last();
		dispatch('pageChanged');
	};
</script>

{#if $gamesList.length && !$busy && !$filters.onlyFavorites}
	<div class='pagination'>
		<div class='[ w-1/3 flex justify-end ]'>
			{#if $pagination.page !== 0}
				<button on:click='{getFirstPage}' class='btn btn--first [ w-12 h12 mx-1 ]'>
					<i class='fas fa-fast-backward'></i>
				</button>
			{/if}

			{#if $pagination.page !== 0}
				<button on:click='{getPrev}' class='btn btn--prev [ w-24 h12 mx-1 ]'>
					&lt;&lt; Prev
				</button>
			{/if}
		</div>

		<div class='[ flex items-center mx-4 h12 text-md font-bold text-gray-200 ]'>
			{$pagination.page + 1} / {$pagination.maxPage + 1}
		</div>

		<div class='[ w-1/3 flex ]'>
			{#if $pagination.page !== $pagination.maxPage}
				<button on:click='{getNext}' class='btn btn--next [ w-24 h12 mx-1 ]'>
					Next &gt;&gt;
				</button>
			{/if}

			{#if $pagination.page !== $pagination.maxPage}
				<button on:click='{getLast}' class='btn btn--last [ w-12 h12 mx-1 ]'>
					<i class='fas fa-fast-forward'></i>
				</button>
			{/if}
		</div>

	</div>
{/if}

<style lang='scss'>
  .btn {
    @apply p-1 text-gray-100 font-mono rounded outline-none transition-colors duration-100;

    &--prev {
      @apply bg-gray-600;

      &:hover,
      &:active {
        @apply bg-gray-700;
      }
    }

    &--next {
      @apply bg-orange-600;

      &:hover,
      &:active {
        @apply bg-orange-700;
      }
    }

    &--first,
    &--last {
      @apply text-gray-200;
    }
  }

  .pagination {
    @apply py-3 flex justify-center z-30 bg-gray-800;
  }
</style>
