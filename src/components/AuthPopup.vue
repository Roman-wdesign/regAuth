<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import TheButton from '@/components/TheButton.vue'

const authStore = useUserStore()
const isPopupVisible = ref(!authStore.isAuthenticated) // Попап не виден, если пользователь авторизован
const username = ref('')
const password = ref('')

const login = async () => {
  if (username.value && password.value) {
    try {
      await authStore.login(username.value, password.value)
      closePopup()
    } catch (error) {
      console.error('Ошибка входа:', error)
      // Здесь можно добавить логику обработки ошибки
    }
  }
}

const closePopup = () => {
  isPopupVisible.value = false
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    isPopupVisible.value = false
  }
})
</script>

<template>
  <div v-if="isPopupVisible" class="popup-overlay">
    <div class="popup-content">
      <div class="header">
        <div class="btn-pos">
          <TheButton
            :hasPadding="false"
            @click="closePopup"
            label=""
            icon="IconClose"
            class="close-btn"
          >
            Закрыть
          </TheButton>
        </div>
        <h2 class="popup_login-header">Вход в ваш аккаунт</h2>
      </div>
      <form class="form-login" @submit.prevent="login">
        <div class="box">
          <label class="label">Пароль</label>
          <input
            class="input-username"
            v-model="username"
            placeholder="Введите email"
            required
          />
        </div>
        <div class="box">
          <label class="label">Email</label>
          <input
            class="input-password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            required
          />
        </div>
      </form>
      <div class="links">
        <div class="reg-info">
          <a>У вас нет аккаунта?</a>

          <RouterLink to="/register">
            <a class="go-reg">Зарегистрируйтесь</a>
          </RouterLink>
        </div>
        <div>
          <TheButton
            type="submit"
            :hasPadding="false"
            @click="login"
            label="Войти"
            icon=""
            class="submit-btn"
          >
            Войти
          </TheButton>
        </div>
      </div>
      <div v-if="!authStore.isAuthenticated && username" class="error-nouser">
        <p class="error-message">Пользователь с таким логином не найден</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

a {
  color: $grey;
  font-size: $text-font-size-small;

  text-decoration: none;
}

.error-nouser {
  background-color: rgba(255, 116, 97, 0.1);
  color: $warning;
  font-size: $text-font-size-small;
  width: 100%;
  border-radius: 24px;
  padding-left: 20px;
}

.box {
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 0 10px 24px 0;
}

.label {
  color: $grey;
  padding-left: 20px;
  font-size: $text-font-size-small;
}

.input-username {
  font-size: $text-font-size-small;
  padding: 23px 10px 23px 20px;
  min-width: 620px;
  width: 100%;
  border-radius: 36px;
}

.input-password {
  font-size: $text-font-size-small;
  padding: 23px 10px 23px 20px;
  min-width: 620px;
  width: 100%;
  border-radius: 36px;
}

.popup-content {
  background: $dark-middle;
  padding: 80px;
  border-radius: 40px;
  max-width: 780px;
  max-height: 672px;
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup_login-header {
  color: $green-middle;
}

.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.close-btn {
  background: $green-middle;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;

  padding: 20px 20px;
}

.submit-btn {
  background: $green-middle;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  font-size: $text-font-size-normal;
  padding: 12px 24px;
}

.btn-pos {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 20px;
  padding-top: 20px;
}

.reg-info {
  display: flex;
  flex-direction: column;
}

.go-reg {
  color: $green-light;
  font-size: $text-font-size-small-bold;
}

.links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: $breakpoint-small) and (max-width: $breakpoint-medium) {
}

@media (min-width: $breakpoint-medium) and (max-width: $breakpoint-large) {
}

@media (min-width: $breakpoint-large) and (max-width: $breakpoint-xlarge) {
}

@media (min-width: $breakpoint-xlarge) {
}
</style>
