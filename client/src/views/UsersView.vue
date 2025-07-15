<template>
  <div>
    <h1>Používatelia</h1>
    <button @click="showForm = true">+ Pridať používateľa</button>

    <DataTable
      :items="users"
      :headers="headers"
      :perPage="5"
    >
      <template #actions="{ item }">
        <button @click="editUser(item)">✏️</button>
        <button @click="deleteUser(item)">🗑️</button>
      </template>
    </DataTable>

    <NewUserForm v-if="showForm" @close="showForm = false" @created="reloadUsers" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from '@/components/base/DataTable.vue'
import NewUserForm from '@/components/user/NewUserForm.vue'
import { getAllUsers } from '@/services/user.service'
import type { User } from '@/models/user.model'

const users = ref<User[]>([])
const showForm = ref(false)

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
