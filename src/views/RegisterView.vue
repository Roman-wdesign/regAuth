<script setup lang="ts">
import { ref } from 'vue'
import { register, login } from '@/api/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    // Регистрируем пользователя
    await register(email.value, password.value, confirmPassword.value)

    // Логинимся после регистрации и получаем токен
    await login(email.value, password.value)

    // Переход на страницу логина
    router.push('/login')
  } catch (e) {
    // Выводим сообщение об ошибке
    error.value =
      e.response?.data?.message || 'Произошла ошибка при регистрации'
  }
}
</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
