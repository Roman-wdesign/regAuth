<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/api/auth'
import AuthPopup from './AuthPopup.vue'

const router = useRouter()
const showRegisterModal = ref(false) // Флаг для отображения модального окна регистрации

onMounted(async () => {
  // Проверка авторизации при монтировании
  const token = localStorage.getItem('token')
  const authStatus = token ? await isAuthenticated() : false

  if (!authStatus) {
    // Если пользователь не авторизован
    const isRegistered = localStorage.getItem('isRegistered') // Проверка регистрации
    if (isRegistered) {
      // Если зарегистрирован, но не авторизован, перенаправляем на страницу авторизации
      router.push({ name: 'login' })
    } else {
      // Если не зарегистрирован, показываем модальное окно регистрации
      showRegisterModal.value = true
    }
  }
})
</script>

<template>
  <div class="welcome">
    <div class="welcome_text-block">
      <AuthPopup></AuthPopup>
      <h1>
        Мои <br />
        заметки
      </h1>
      <h3>
        Не забывай о важном, <br />
        храни его в облаке.
      </h3>
    </div>

    <div class="svg-container">
      <img src="@/components/picture/picture.svg" alt="Large SVG" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

img {
  width: 100%;
  height: auto;
}

@media (min-width: $breakpoint-small) {
  .welcome {
    width: 100%;
    min-height: 640px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0;
  }

  .svg-container {
    width: 100%;
    max-width: 300px;
    height: auto;
    padding-top: 190px;
  }

  h1 {
    font: {
      family: $heading-font-family;
      size: $h1-font-size-mob;
      weight: $font-black-weight;
    }
  }

  h3 {
    font: {
      family: $heading-font-family;
      size: $h3-font-size-mob;
      weight: $font-regular-weight;
    }
  }
}

@media (min-width: $breakpoint-medium) {
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .svg-container {
    width: 100%;
    max-width: 300px;
    height: auto;
    padding-top: 190px;
  }

  h1 {
    font: {
      family: $heading-font-family;
      size: $h1-font-size-mob;
      weight: $font-black-weight;
    }
  }

  h3 {
    font: {
      family: $heading-font-family;
      size: $h3-font-size-mob;
      weight: $font-regular-weight;
    }
  }
}

@media (min-width: $breakpoint-large) {
  .welcome {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    text-align: start;
  }

  .welcome_text-block {
    display: flex;
    flex-direction: column;
  }

  .svg-container {
    width: 100%;
    max-width: 628px;
    height: auto;
    padding-top: 190px;
  }

  h1 {
    font: {
      family: $heading-font-family;
      size: $h1-font-size;
      weight: $font-black-weight;
    }
  }

  h3 {
    font: {
      family: $heading-font-family;
      size: $h3-font-size;
      weight: $font-regular-weight;
    }
  }
}

@media (min-width: $breakpoint-xlarge) {
  .welcome {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 160px;
    text-align: start;
  }

  .welcome_text-block {
    display: flex;
    flex-direction: column;
  }

  .svg-container {
    width: 100%;
    max-width: 800px;
    height: auto;
    padding-top: 30px;
  }

  h1 {
    font: {
      family: $heading-font-family;
      size: $h1-font-size;
      weight: $font-black-weight;
    }
  }

  h3 {
    font: {
      family: $heading-font-family;
      size: $h3-font-size;
      weight: $font-regular-weight;
    }
  }
}
</style>
