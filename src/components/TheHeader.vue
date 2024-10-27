<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheButton from '@/components/TheButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToLogin = () => {
  router.push('/register')
}

const isAuthenticated = ref(false) // Флаг авторизации
const userEmail = ref<string | null>(null) // Почта пользователя

// Проверка авторизации пользователя при монтировании
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    // Если токен существует, считаем пользователя авторизованным
    isAuthenticated.value = true
    // Получаем почту пользователя из локального хранилища
    userEmail.value = localStorage.getItem('userEmail')
  }
})
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <div class="svg-container">
        <img src="@/components/icons/logo.svg" alt="Large SVG" />
      </div>
    </RouterLink>
    <div>
      <span v-if="isAuthenticated">Вы авторизованы</span>
      <span v-if="isAuthenticated">{{ userEmail }}</span>
      <TheButton
        v-if="!isAuthenticated"
        @loginClick="goToLogin"
        :hasPadding="true"
        label="Вход"
        icon="IconLogIn"
        buttonClass="login-button"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

img {
  width: 100%;
  height: auto;
}

.login-button {
  background-color: $green-light;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  font-size: 3.2rem;
}

@media (min-width: $breakpoint-small) and (max-width: $breakpoint-medium) {
  .svg-container {
    width: 100%;
    max-width: 154px;
    height: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 10px;
  }
}

@media (min-width: $breakpoint-medium) and (max-width: $breakpoint-large) {
  .svg-container {
    width: 100%;
    height: auto;
    max-width: 219px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px;
  }
}

@media (min-width: $breakpoint-large) and (max-width: $breakpoint-xlarge) {
  .svg-container {
    width: 100%;
    height: auto;
    max-width: 219px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 80px;
  }
}

@media (min-width: $breakpoint-xlarge) {
  .svg-container {
    width: 100%;
    height: auto;
    max-width: 219px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 160px;
  }
}
</style>
