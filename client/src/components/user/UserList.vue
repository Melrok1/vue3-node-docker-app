<template>
  <div>
    <h1>List of all users:</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.name }} ({{ user.email }})
        <pre> {{ user }} </pre>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAllUsers } from '@/services/user.service'
import type { User } from '@/models/user.model'

const users = ref<User[]>([])

onMounted(async () => {
  try {
    users.value = await getAllUsers()
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
})


</script>