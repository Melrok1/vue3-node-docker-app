<template>
  <div class="new-user-form__wrapper">
    <form @submit.prevent="submitForm">
      <BaseInput
        v-model="user.name"
        label="Meno"
        placeholder="Zadajte meno"
        :error="user.name"
      />
      <BaseInput
        v-model="user.email"
        label="Email"
        type="email"
        :error="user.email"
      />
      <button type="submit">Create User</button>
      <button @click="$emit('close')">Close</button>
    </form>
    <div class="overlay" @click="$emit('close')"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue' 
import { createUser } from '@/services/user.service'
import BaseInput from '@/components/form/BaseInput.vue'

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

.new-user-form__wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    background: #fff;
    padding: 3rem;
    z-index: 10;
  }
}

</style>
