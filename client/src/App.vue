
<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'

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
}

</style>
