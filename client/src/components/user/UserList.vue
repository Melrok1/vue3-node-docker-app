<template>
  <div>
    <h1>List of all users:</h1>
    <DataTable :items="users" :headers="headers" :perPage="5">
      <template #actions="{ item }">
        <button @click="editUser(item)">✏️</button>
        <button @click="deleteUser(item)">🗑️</button>
      </template>

    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllUsers } from '@/services/user.service'
import type { User } from '@/models/user.model'
import DataTable from '@/components/base/DataTable.vue'

const users = ref<User[]>([])
const headers = [
  { key: 'name', label: 'Meno' },
  { key: 'email', label: 'Email' }
]

async function reloadUsers () {
  users.value = await getAllUsers()
}

function editUser (user: User) {
  console.log('edit:', user)
}

function deleteUser (user: User) {
  console.log('delete:', user)
}

onMounted(reloadUsers)

</script>
