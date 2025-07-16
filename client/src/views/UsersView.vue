<template>
  <div>
    <h1>Používatelia</h1>
    <button @click="showForm = true">+ Pridať používateľa</button>

    <UserList :users="users"/>
    <NewUserForm v-if="showForm" @close="showForm = false" @created="reloadUsers" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllUsers } from '@/services/user.service'
import type { User } from '@/models/user.model'
import NewUserForm from '@/components/user/NewUserForm.vue'
import UserList from '@/components/user/UserList.vue'

const users = ref<User[]>([])
const showForm = ref(false)

async function reloadUsers () {
  users.value = await getAllUsers()
}

onMounted(() => {
  reloadUsers()
})

</script>
