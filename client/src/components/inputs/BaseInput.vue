<template>
  <div class="base-input" :class="[size, { 'has-error': !!error }]">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="internalValue"
      :required="required"
      @input="$emit('update:modelValue', internalValue)"
    />
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Ui from '@/models/ui'
import type { SizeType } from '@/models/ui'

const props = defineProps({
  modelValue: { 
    type: String, 
    default: '' 
  },
  label: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    default: 'text' 
  },
  id: { 
    type: String, 
    default: () => `input-${Math.random().toString(36).slice(2)}` 
  },
  placeholder: { 
    type: String, 
    default: '' 
  },
  required: { 
    type: Boolean, 
    default: false 
  },
  error: { 
    type: String, 
    default: '' 
  },
  size: { 
    type: String as () => SizeType,
    default: Ui.Size.MEDIUM 
  }
})

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})
</script>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &.sm input { @include input-size(sm); }
  &.md input { @include input-size(md); }
  &.lg input { @include input-size(lg); }

  &.has-error input {
    border-color: var(--color-danger);
  }

  .error-message {
    color: var(--color-danger);
    font-size: 0.875rem;
  }
}
</style>
