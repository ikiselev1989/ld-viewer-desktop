<script lang='ts'>
	export let value: boolean;
</script>

<label>
	<input bind:checked={value} class='checkbox__input' on:change type='checkbox' />
	<span class='checkbox__mark [ w-5 h-5 ]'>
			<i class='fas fa-check | checkbox__check'></i>
	</span>
</label>

<style lang='scss'>
  .checkbox {
    $root: &;

    @apply flex items-center;
    @apply cursor-pointer;

    & + & {
      @apply ml-4;
    }

    &__input {
      @apply hidden;

      &:checked {
        & + #{$root}__mark {
          #{$root}__check {
            @apply opacity-100;
          }
        }
      }
    }

    &__mark {
      @apply p-1;
      @apply flex justify-center items-center;
      @apply border-2 border-white;
    }

    &__check {
      @apply text-orange-600;
      @apply opacity-0;
      @apply transition-opacity duration-200;
    }
  }
</style>
