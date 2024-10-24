<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="header">
    <div class="svg-container">
      <img src="@/components/icons/logo.svg" alt="Large SVG" />
    </div>
    <div>
      <TheButton
        @loginClick="goToLogin"
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
