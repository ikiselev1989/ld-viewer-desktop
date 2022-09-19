<div class='loading'>
	<div class='icon [ animate-spin ]'>
		<i class='fas fa-cog'></i>
	</div>
	<p class='title'>loading...</p>
</div>

<style lang='scss'>
  .loading {
    @apply w-full h-full absolute inset-0 flex justify-center items-center z-20 bg-gray-600;

    .title {
      @apply ml-3 text-lg text-white;
      font-family: LudumDairy, serif;
    }

    .icon {
      @apply text-xl text-white leading-none;
    }
  }
</style>
