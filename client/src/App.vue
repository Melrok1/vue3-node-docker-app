
<template>
  <header>
    <MainNav />
  </header>
  <RouterView />
</template>

<script setup lang="ts">

import { RouterView } from 'vue-router'
import MainNav from '@/components/MainNav.vue'

</script>

<style scoped lang="scss">

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #42b983;

  .logo {
    width: 125px;
    height: 125px;
  }
}

</style>
