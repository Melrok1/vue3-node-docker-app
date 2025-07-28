<template>
  <div class="user-view">
    <h1>Používatelia</h1>
    <Button @click="showForm = true" variant="primary" size="lg">
      {{ $t('form.actions.addUser') }}
    </Button>
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
import Button from '@/components/inputs/Button.vue'

const users = ref<User[]>([])
const showForm = ref(false)

async function reloadUsers () {
  users.value = await getAllUsers()
}

onMounted(() => {
  reloadUsers()
})

</script>

<style lang="scss" scoped>

.user-view {
  padding: 2rem;
  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .base-button {
    margin-right: 1rem;
  }
}

</style>
