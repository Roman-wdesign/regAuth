<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const email = ref('')
const password = ref('')
const error = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const { token } = await login(email.value, password.value)
    userStore.login(token)
    router.push('/')
  } catch (e) {
    error.value = e.response.data.message
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
