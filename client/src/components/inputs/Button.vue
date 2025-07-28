<template>
  <div class="base-button">
    <button :type="props.type" class="variant">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">

type variant = 'primary' | 'secondary' | 'danger' | 'text' | 'icon'
type size = 'sm' | 'md' | 'lg'
type buttonType = 'button' | 'submit' | 'reset'

const props = withDefaults(defineProps<{
  type?: buttonType
  variant?: variant
  size?: size
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})

</script>

<style scoped lang="scss">

.base-button {
  display: inline-block;

  button {
    @include input-size(md);
    width: 100%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #cecece;

    &:hover {
      background: #777777;
    }
  }
}

</style>