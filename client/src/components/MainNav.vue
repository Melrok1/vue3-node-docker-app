<template>
  <nav>
    <div class="nav-links">
      <RouterLink to="/">{{ $t('common.nav.home') }}</RouterLink>
      <RouterLink to="/about">{{ $t('common.nav.about') }}</RouterLink>
      <RouterLink to="/users">{{ $t('common.nav.users') }}</RouterLink>
      <RouterLink to="/settings">{{ $t('common.nav.settings') }}</RouterLink>
    </div>
    <UISettingsQuickAccess />
  </nav>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'
import UISettingsQuickAccess from '@/components/UISettingsQuickAccess.vue';

</script>

<style scoped lang="scss">

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .nav-links {
    a {
      color: white;
      text-decoration: none;
      margin-right: 1rem;
  
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

</style>
