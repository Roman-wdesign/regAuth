<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import TheButton from '@/components/TheButton.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const isAuthenticated = ref(false)
const userEmail = ref<string | null>(null)

// Проверяем наличие токена и email при монтировании
onMounted(() => {
  if (userStore.token) {
    isAuthenticated.value = true
    userEmail.value = userStore.email || localStorage.getItem('userEmail')
  }
})

// Отслеживаем изменения email в userStore
watch(
  () => userStore.email,
  newEmail => {
    if (newEmail) {
      isAuthenticated.value = true
      userEmail.value = newEmail
    } else {
      isAuthenticated.value = false
      userEmail.value = null
    }
  },
)

function reloadPage() {
  location.reload()
}

// Функция выхода
const logout = () => {
  userStore.logout()
  isAuthenticated.value = false
  userEmail.value = null
  router.push('/')
}
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <div class="svg-container">
        <img src="@/components/icons/logo.svg" alt="Large SVG" />
      </div>
    </RouterLink>
    <div>
      <!-- <span v-if="isAuthenticated">Вы авторизованы</span> -->
      <span class="user-email" v-if="isAuthenticated && userEmail">{{
        userEmail
      }}</span>
      <TheButton
        buttonClass="login-button"
        v-if="isAuthenticated"
        @click="logout"
        :hasPadding="true"
        label="Выход"
        icon="IconUser"
      />
      <TheButton
        buttonClass="login-button"
        v-else
        @click="reloadPage"
        :hasPadding="true"
        label="Вход"
        icon="IconLogIn"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

.user-email {
  color: $grey;
}

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
