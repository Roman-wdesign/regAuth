<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <div class="container">
    <header>
      <TheHeader />
    </header>
    <RouterView />
  </div>
</template>
