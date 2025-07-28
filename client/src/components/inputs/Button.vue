<template>
  <button
    class="base-button"
    :class="[variant, size, { 'is-fullwidth': fullWidth }]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'danger' | 'text' | 'icon'
type Size = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'

const props = defineProps({
  nativeType: { 
    type: String as () => ButtonType, 
    default: 'button' 
  },
  variant: { 
    type: String as () => Variant, 
    default: 'primary' 
  },
  size: { 
    type: String as () => Size, 
    default: 'md' 
  },
  loading: { 
    type: Boolean, 
    default: false 
  },
  disabled: { 
    type: Boolean, 
    default: false 
  },
  fullWidth: { 
    type: Boolean, 
    default: false 
  }
})
</script>

<style scoped lang="scss">
.base-button {
  @include input-size(md);

  &.sm { @include input-size(sm); }
  &.md { @include input-size(md); }
  &.lg { @include input-size(lg); }

  &.primary { background: #1d572e; color: white; }
  &.danger { background: var(--color-danger); color: white; }

  &.is-fullwidth { width: 100%; }
}
</style>
