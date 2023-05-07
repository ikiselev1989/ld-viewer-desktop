<script lang='ts'>
	import { fade } from 'svelte/transition';
</script>

<div class='start-screen [ fixed inset-0 flex flex-col justify-center items-center bg-gray-800 z-50 ]'
		 transition:fade={{duration: 250}}>
	<div class='[ flex ]'>
		<span class='[ text-orange-600 ]'>Ludum</span>
		<span class='[ text-orange-500 ]'>Dare</span>
		<span class='[ text-white ]'>Viewer</span>
	</div>
	<div class='[ mt-4 flex items-center text-xs text-white ]'>
		<div class='[ leading-none flex items-center justify-center animate-spin ]'>
			<i class='fas fa-cog'></i>
		</div>
		<p class='[ ml-2 ]'>loading...</p>
	</div>
</div>

<style lang='scss'>
  .start-screen {
    @apply text-3xl;
    font-family: LudumDairy, serif;
  }
</style>
