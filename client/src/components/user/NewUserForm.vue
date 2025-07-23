<template>
  <div class="new-user-form__wrapper">
    <form @submit.prevent="submitForm" novalidate>
      <BaseInput
        v-model="user.name"
        label="Meno"
        placeholder="Zadajte meno"
        :error="error.name"
      />
      <BaseInput
        v-model="user.email"
        label="Email"
        type="email"
        :error="error.email"
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
import { useI18n } from 'vue-i18n'
import BaseInput from '@/components/form/BaseInput.vue'


const { t } = useI18n()
const MIN_NAME = 3
const MAX_NAME = 20
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const error = ref<{ name?: string, email?: string }>({})
const emit = defineEmits(['close', 'created'])
const user = ref({
  name: '',
  email: ''
})


async function submitForm () {
 const localErrors: { name?: string, email?: string } = {}

  // Validácia: Required
  // -- Meno
  if (!user.value.name) {
    localErrors.name = t('form.errors.requiredName')
  } else {
    if (user.value.name.length < MIN_NAME) {
      localErrors.name = t('form.errors.minName', { min: MIN_NAME })
    } else if (user.value.name.length > MAX_NAME) {
      localErrors.name = t('form.errors.maxName', { max: MAX_NAME })
    }
  }
  // -- Email
  if (!user.value.email) {
    localErrors.email = t('form.errors.requiredEmail')
  } else if (!EMAIL_REGEX.test(user.value.email)) {
    localErrors.email = t('form.errors.invalidEmail')
  }

  // Ak existujú chyby – zobraz ich
  if (Object.keys(localErrors).length > 0) {
    error.value = localErrors
    return
  }

  error.value = {} // vymaž chyby

  try {
    const response = await createUser(user.value)
    console.log('User created:', response)

    user.value.name = ''
    user.value.email = ''

    emit('created')
    emit('close')
  } catch (err: any) {
    console.error('Error creating user:', err)
    if (err?.response?.data?.errors) {
      error.value = err.response.data.errors
    } else {
      console.error('❌ Unexpected error:', err)
    }
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
