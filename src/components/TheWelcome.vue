<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'
</script>

<template>
  <div>
    <TheButton label="Войти"></TheButton>
    <TheButton label="" icon="IconAdd" />
    <TheButton label="Войти" icon="IconLogIn" buttonClass="login-button" />
    <h1>Мои заметки</h1>
  </div>
</template>

<style lang="scss">
@use '@/style/vars.scss' as *;

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
</style>
