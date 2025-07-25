<template>
  <div class="new-user-form__wrapper">
    <form v-if="!successfullyForm"  @submit.prevent="submitForm" novalidate>
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
    <div v-else class="confirmation success">
      <p>{{ t('form.success.userCreated') }}</p>
      <CountdownCircle
        :duration="SUCCESS_MESSAGE_TIMEOUT_MS"
        color="#1d572e"
        :showTime="true"
      />
      <button @click="$emit('close')">✖ {{ t('form.actions.closeNow') }}</button>
    </div>
    <div class="overlay" @click="$emit('close')"></div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue' 
import { createUser } from '@/services/user.service'
import { useI18n } from 'vue-i18n'
import BaseInput from '@/components/form/BaseInput.vue'
import CountdownCircle from '@/components/animation/CountdownCircle.vue'


const MIN_NAME = 3
const MAX_NAME = 20
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUCCESS_MESSAGE_TIMEOUT_MS = 3000

const { t } = useI18n()
const successfullyForm = ref(false)
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
    successfullyForm.value = true

    setTimeout(() => {
      emit('close')
    }, SUCCESS_MESSAGE_TIMEOUT_MS)
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
  .confirmation.success {
    background: rgba(11, 170, 61, 0.726);
    color: #ebebeb;
    padding: 2rem;
    border-radius: 6px;
    z-index: 10;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    button {
      margin-top: 1rem;
      background: #cecece;
      border: none;
      color: #303030;
      cursor: pointer;
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #b3b3b3;
        color: #000;
      }
    }
    .countdown-circle {
      margin-top: 1rem;
    }
  }
}

</style>
