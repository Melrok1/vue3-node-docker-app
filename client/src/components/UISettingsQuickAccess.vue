<template>
  <div class="ui-settings">
    <!-- Theme toggle -->
    <button @click="toggleTheme">
      {{ currentTheme === 'light' ? '🌞' : '🌙' }}
    </button>
    <!-- Language toggle -->
    <select v-model="selectedLocale" @change="changeLocale">
      <option value="sk">🇸🇰</option>
      <option value="en">🇬🇧</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// Language handling
const selectedLocale = ref(localStorage.getItem('app-locale') || 'sk')

function changeLocale () {
  locale.value = selectedLocale.value
  localStorage.setItem('app-locale', selectedLocale.value)
}

// Theme handling
const currentTheme = ref<'light' | 'dark'>('light')

function applyTheme (theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme)
  currentTheme.value = theme
  localStorage.setItem('app-theme', theme)
}

function toggleTheme () {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
  applyTheme(newTheme)
}

onMounted(() => {
  // Apply saved theme
  const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null
  applyTheme(savedTheme || 'light')

  // Apply saved language
  locale.value = selectedLocale.value
})
</script>

<style scoped>
.ui-settings {
  display: flex;
  gap: 1rem;
  align-items: center;
}
select {
  background: none;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  font-size: 1.2rem;
}
button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>