<script lang='ts'>
	import { fade } from 'svelte/transition';
</script>

<div class='overlay [ w-full h-full ]' on:introend on:outroend transition:fade={{duration: 150}}>
	<div class='overlay__bg [ w-full h-full ]'></div>
	<div class='overlay__content [ w-full h-full ]'>
		<slot></slot>
	</div>
</div>

<style lang='scss'>
  .overlay {
    @apply fixed z-50;

    &__bg {
      @apply bg-gray-900;
      opacity: 0.9;
    }

    &__content {
      @apply absolute inset-0 flex flex-col justify-center items-center;
    }
  }
</style>
