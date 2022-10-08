<script lang='ts'>
	import { fade, scale, slide } from 'svelte/transition';
	import { modalsState } from '../utils/stores';
</script>

{#if $modalsState.about}
	<div class='[ fixed inset-0 flex justify-center items-center z-50 ]' transition:fade={{duration: 150}}>
		<div class='[ absolute inset-0 bg-black opacity-50 ]' on:click={()=>$modalsState.about = false}></div>
		<div class='[ px-6 py-4 relative flex rounded bg-gray-100 ]' transition:slide>
			<div class='content'>
				<h3>ABOUT</h3>
				<p>
					This is a viewer for <a href='https://ldjam.com/' target='_blank'>Ludum Dare</a> games.
					<br />
					There is platforms filter and direct link for each platform.
				</p>
				<p>
					If you want to contribute or star it, please check this <a
					href='https://github.com/ikiselev1989/ld-viewer-desktop' target='_blank'>Github</a> repository.
				</p>
				<div class='[ p-1 absolute top-0 right-2 cursor-pointer ]' transition:scale
						 on:click='{()=>$modalsState.about = false}'>
					<i class='fas fa-times'></i>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang='scss'>
  .content {
    @apply text-gray-800;

    h3 {
      @apply mb-5;
      @apply text-xl;
      @apply font-bold;
      @apply uppercase;
    }

    p {
      @apply my-4;
      @apply leading-loose;
    }

    a {
      @apply underline;
    }
  }
</style>
