<script lang='ts'>
	import { fade } from 'svelte/transition';

	export let value;
</script>

<div class='[ w-52 absolute m-auto flex ]' transition:fade={{duration:150}}>
	<div class='[ grow ]'>
		<input autofocus bind:value={value}
					 class='[ w-full h-8 p-2 outline-0 rounded-tl rounded-bl border-orange-600 border-t-2 border-b-2 border-l-2 text-gray-800 ]'
					 type='text'>
	</div>
	<div class='[ px-3 flex justify-center items-center text-white bg-orange-600 rounded-tr rounded-br cursor-pointer ]'
			 on:click>
		<i class='fas fa-times'></i>
	</div>
</div>
