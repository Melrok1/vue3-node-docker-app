<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <button type="submit">Create User</button>
    </form>
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue' 
import { createUser } from '@/services/user.service'

const user = ref({
  name: '',
  email: ''
})

const emit = defineEmits(['close', 'created'])
async function submitForm() {
  try {
    await createUser(user.value)
    emit('created')
    emit('close')
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}

</script>

<style lang="scss" scoped>

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>
