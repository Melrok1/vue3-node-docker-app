<template>
  <div>
    <h1>List of all users:</h1>
    <DataTable :items="props.users" :headers="headers" :perPage="5">
      <template #actions="{ item }">
        <button @click="editUser(item)">✏️</button>
        <button @click="deleteUser(item)">🗑️</button>
      </template>

    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/models/user.model'
import DataTable from '@/components/base/DataTable.vue'

const props = defineProps<{
  users: User[]
}>()

const headers = [
  { key: 'name', label: 'Meno' },
  { key: 'email', label: 'Email' }
]

function editUser (user: User) {
  console.log('edit:', user)
}

function deleteUser (user: User) {
  console.log('delete:', user)
}

</script>
