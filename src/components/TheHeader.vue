<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'
</script>

<template>
  <div class="header">
    <div class="svg-container">
      <img src="@/components/icons/logo.svg" alt="Large SVG" />
    </div>
    <div>
      <TheButton label="Вход" icon="IconLogIn" buttonClass="login-button" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

@media (min-width: $breakpoint-small) {
  .svg-container {
    width: 100%;
    max-width: 154px;
    height: auto;
  }

  img {
    width: 100%;
    height: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
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
}

@media (min-width: $breakpoint-medium) {
  .header {
    display: flex;
    justify-content: space-between;
    margin: 0 160px 0 160px;
    align-items: center;
    height: 80px;
  }

  .login-button {
    background-color: $green-light;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 24px;
    border: none;
    border-radius: 32px;
    cursor: pointer;
    font-size: 3.2rem;
  }
}

@media (min-width: $breakpoint-large) {
  .header {
    display: flex;
    justify-content: space-between;
    margin: 0 160px 0 160px;
    align-items: center;
    height: 80px;
  }

  .login-button {
    background-color: $green-light;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 24px;
    border: none;
    border-radius: 32px;
    cursor: pointer;
    font-size: 3.2rem;
  }
}

@media (min-width: $breakpoint-xlarge) {
  .header {
    display: flex;
    justify-content: space-between;
    margin: 0 160px 0 160px;
    align-items: center;
    height: 80px;
  }

  .login-button {
    background-color: $green-light;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 24px;
    border: none;
    border-radius: 32px;
    cursor: pointer;
    font-size: 3.2rem;
  }
}
</style>
