<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import TheButton from '@/components/TheButton.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const isAuthenticated = ref(false)
const userEmail = ref<string | null>(null)
const showLogoutText = ref(false) // Добавим переменную для отображения текста

onMounted(() => {
  if (userStore.token) {
    isAuthenticated.value = true
    userEmail.value = userStore.email || localStorage.getItem('userEmail')
  }
})

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
    <div class="info-user">
      <span class="user-email" v-if="isAuthenticated && userEmail">{{
        userEmail
      }}</span>

      <div
        class="logout-container"
        v-if="isAuthenticated"
        @mouseover="showLogoutText = true"
        @mouseleave="showLogoutText = false"
      >
        <TheButton
          @click="logout"
          label=""
          :hasPadding="false"
          class="logout-btn"
          icon="IconUser"
        />
        <span v-if="showLogoutText" class="hover-text">Выйти</span>
      </div>

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

.logout-container {
  position: relative;
  display: inline-flex;
  align-items: center;

  .hover-text {
    position: absolute;
    bottom: -10rem;
    left: 50%;
    transform: translateX(-50%);
    color: $green-light;
    font-size: 1.4rem;
    background-color: $dark-middle;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
  }
}

.logout-btn {
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.user-email {
  font-size: $text-font-size-small;
  color: $grey;
}

.info-user {
  display: flex;
  flex-direction: row;
  align-items: center;
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
