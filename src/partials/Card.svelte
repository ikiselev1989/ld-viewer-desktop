<script lang='ts'>
	import { data, event } from '../utils/stores';

	export let id;
	export let url;
	export let cover;
	export let name;
	export let type;
	export let sources;

	const addToVisited = (id: number) => data.addVisited($event, id);

	const toggleFavorite = (id: number) => ($data.favorites[$event] || []).includes(id) ? removeFromFavorites(id) : addToFavorites(id);

	const addToFavorites = (id: number) => data.addFavorite($event, id);

	const removeFromFavorites = (id: number) => data.removeFavorite($event, id);
</script>

<div class='card [ w-full ]'
		 class:card--favorite={($data.favorites[$event] || []).includes(id)}
		 class:card--visited={($data.visited[$event] || []).includes(id)}
		 on:click={()=>addToVisited(id)}
>
	<div class='card__container'>
		<a class='entry-link' href='{url}' target='_blank'>
			<img alt='value.name' class='card__image [ w-full h-36 ]' src='{cover}' />
		</a>
		<div class='card__overlay'>
			<i class='fas fa-eye'></i>
		</div>
		<div class='bookmark [ absolute top-0 left-2 text-orange-600 text-4xl overflow-hidden cursor-pointer ]'
				 on:click|stopPropagation={()=>toggleFavorite(id)}>
			<div class='[ relative -top-6 ]'>
				<i class='fas fa-bookmark'></i>
			</div>
		</div>
		<a class='card__text-container' href='{url}' target='_blank'>
			<span class='event-type event-type--{type}'>{ type }</span>
			<h5>{ name }</h5>
		</a>

		<div class='card__footer [ w-full mt-auto grid grid-cols-6 ]'>
			{#each sources.slice(0, 5) as src}
				{#if src[0]}
					<a href='{src[1]}' title='{src[2]}'
						 target='_blank'
						 class='card__source-link [ text-gray-800 ]'>
						{@html src[0]}
					</a>
				{/if}
			{/each}
			{#if sources.slice(6).length}
				<div class='[ flex justify-center items-center text-lg font-bold text-gray-800 ]'>
					+{sources.slice(6).length}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang='scss'>
  .event-type {
    @apply uppercase font-bold;

    &--compo {
      @apply text-orange-500;
    }

    &--jam {
      @apply text-orange-600;
    }

    &--extra {
      @apply text-green-400;
    }
  }

  .card {
    @apply flex flex-col relative;

    .bookmark {
      &:hover {
        :first-child {
          @apply -top-2;
        }
      }
    }

    &__container {
      @apply h-full relative flex flex-col bg-gray-100;
    }

    .entry-link {
      @apply relative;


      &:after {
        @apply absolute inset-0 bg-gray-800 opacity-10;
        content: '';
      }
    }

    &__image {
      @apply object-cover;
    }

    &__text-container {
      @apply p-2 font-mono;
    }

    &__link {
      &:after {
        content: '';
        @apply absolute inset-0 z-10;
      }
    }

    &__footer {
      @apply p-2 text-xl lg:text-2xl;
    }

    &__source-link {
      @apply flex justify-center items-center;
    }

    &__overlay {
      @apply flex;
      @apply justify-end;
      @apply items-start;
      @apply absolute;
      @apply inset-0;
      @apply bg-gray-800;
      @apply opacity-0;
      @apply pointer-events-none;

      .fas {
        @apply m-2;
        @apply text-white;
        @apply text-2xl
      }
    }

    &--visited {
      .card__container {
        @apply relative;
      }

      .card__overlay {
        @apply opacity-50;
      }
    }

    &--favorite {
      &:before {
        @apply w-full h-full;
        @apply absolute -bottom-1 -right-1;
        @apply bg-orange-600;
        content: '';
      }

      .bookmark {
        :first-child {
          @apply -top-2;
        }
      }
    }
  }
</style>
