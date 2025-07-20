<template>
  <div>
    <h1>{{ $t('settings.mainTitle') }}</h1>
    <select v-model="selectedLocale" @change="changeLocale">
      <option value="sk">Slovensky</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const selectedLocale = ref(localStorage.getItem('app-locale') || 'sk')

const { locale, availableLocales } = useI18n()

function changeLocale () {
  locale.value = selectedLocale.value
  localStorage.setItem('app-locale', selectedLocale.value)
  console.log(`Language changed to: ${selectedLocale.value}`)
}

</script>
