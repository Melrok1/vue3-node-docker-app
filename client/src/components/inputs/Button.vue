<template>
  <div class="base-button" :size="size">
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
  size: 'md',
  disabled: false
})

</script>

<style scoped lang="scss">

.base-button[size='sm'] button{
  @include input-size(sm);
}

.base-button[size='md'] button {
  @include input-size(md);
}

.base-button[size='lg'] button{
  @include input-size(lg);
}

.base-button {
  display: inline-block;

  button {
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