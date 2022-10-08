<script lang='ts'>
	import { getVersion } from '@tauri-apps/api/app';
	import { onMount } from 'svelte';

	let appVer;

	onMount(async () => appVer = await getVersion());
</script>

{#if appVer}
	<div class='version-informer fixed bottom-0 right-0 text-gray-400 text-xs z-30'>v.{ appVer }</div>
{/if}
