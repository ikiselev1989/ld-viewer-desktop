<script lang='ts'>
	let open = false;

	export let disabled;
	export let options: string[];
	export let value;
	export let prefix = '';
</script>

{#if options}
	<div class='select [ w-full relative flex flex-col box-border ]' data-disabled='{disabled}'>
		<div class='[ w-full px-2 py-1 rounded bg-white cursor-pointer text-right hover:bg-gray-200]'
				 on:click={()=>open=!open}>{prefix}{value}</div>
		{#if open}
			<div class='[ w-full absolute -bottom-2 transform translate-y-full bg-white rounded overflow-hidden ]'>
				{#each options as title, index}
					<div class='[ px-2 py-1 cursor-pointer hover:bg-gray-400 hover:text-white ]'
							 on:click={()=>{value=options[index]; open=false}}>{prefix}{title}</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style lang='scss'>
  .select {
    &[data-disabled="true"] {
      &:after {
        @apply absolute inset-0;
        @apply bg-gray-800 opacity-50;
        content: '';
      }
    }
  }
</style>
