<script setup lang="ts">
import { ref } from 'vue'
import { register } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

import TheButton from '@/components/TheButton.vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const authStore = useUserStore()
const isPopupVisible = ref(!authStore.isAuthenticated)

const closePopup = () => {
  isPopupVisible.value = false
}

const handleRegister = async () => {
  try {
    // Регистрируем пользователя
    await register(email.value, password.value, confirmPassword.value)

    // Логинимся после регистрации и получаем токен
    await authStore.login(email.value, password.value)

    // Переход на страницу логина
    router.push('/notes')
  } catch (e) {

    // Выводим сообщение об ошибке
    const err = e as { response?: { data?: { message?: string } } }
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Произошла ошибка при регистрации'
    }
  }
}
</script>

<template>
  <div class="register">
    <div v-if="isPopupVisible" class="popup-overlay">
      <div class="popup-content">
        <div class="header">
          <div class="btn-pos">
            <TheButton :hasPadding="false" @click="closePopup" label="" icon="IconClose" class="close-btn">
            </TheButton>
          </div>
          <h2 class="popup_login-header">Регистрация</h2>
        </div>
        <form class="form-login" @submit.prevent="handleRegister">
          <div class="box">
            <label class="label">Email</label>
            <input type="email" class="input-username" v-model="email" placeholder="Введите email" required />
          </div>
          <div class="box">
            <label class="label">Пароль</label>
            <input class="input-password" v-model="password" type="password" placeholder="Введите пароль" required />
          </div>
          <div class="box">
            <label class="label">Пароль ещё раз</label>
            <input class="input-password" v-model="confirmPassword" type="password" placeholder="Введите пароль"
              required />
            <div class="links">
              <div class="reg-info">
                <RouterLink to="/">
                  <a>У вас есть аккаунт?</a>
                </RouterLink>
              </div>
              <div>
                <TheButton type="submit" :hasPadding="false" label="Зарегистрироваться" icon="" class="submit-btn">
                </TheButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

.go-reg {
  color: $green-light;
  font-size: $text-font-size-small-bold;
}

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
  padding: 0 10px 14px 0;
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
  font-size: $h2-font-size;
  color: $white;
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
  padding-top: 20px;
}
</style>
