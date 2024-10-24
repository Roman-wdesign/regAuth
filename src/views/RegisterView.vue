<script setup lang="ts">
import { ref } from 'vue'
import { register } from '@/api/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    await register(email.value, password.value)
    router.push('/login')
  } catch (e) {
    error.value = e.response.data.message
  }
}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
