<template>
  <nav>
    <RouterLink to="/">{{ $t('common.nav.home') }}</RouterLink>
    <RouterLink to="/about">{{ $t('common.nav.about') }}</RouterLink>
    <RouterLink to="/users">{{ $t('common.nav.users') }}</RouterLink>
    <RouterLink to="/settings">{{ $t('common.nav.settings') }}</RouterLink>
  </nav>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'

</script>

<style scoped lang="scss">

nav {
  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>
