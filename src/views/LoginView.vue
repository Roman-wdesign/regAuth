<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const email = ref('')
const password = ref('')
const error = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    if (e instanceof Error && e.response?.data?.message) {
      error.value = e.response.data.message
    } else {
      error.value = 'Произошла ошибка'
    }
  }
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
