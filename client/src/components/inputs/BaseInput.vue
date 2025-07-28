<template>
  <div class="base-input__wrapper">
    <label :for="id">{{ label }}</label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="internalValue"
      :required="required"
      @input="emit('update:modelValue', internalValue)"
      :class="{ 'has-error': !!error }"
    />

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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
  }
})

const emit = defineEmits(['update:modelValue'])

// vnútorná hodnota viazaná na v-model
const internalValue = ref(props.modelValue)

// keď sa vonkajší modelValue zmení → aktualizuj internalValue
watch(() => props.modelValue, (val) => {
  internalValue.value = val
})
</script>

<style scoped>
.base-input__wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input.has-error {
  border-color: var(--color-danger);
}

.error-message {
  color: var(--color-danger);
  font-size: 0.875rem;
}
</style>

