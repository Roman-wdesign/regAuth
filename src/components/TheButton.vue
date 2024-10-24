<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { defineEmits } from 'vue'
const emit = defineEmits(['loginClick'])

const props = defineProps({
  icon: {
    type: String,
    required: false,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    required: false,
    default: '#ffffff',
  },
  buttonClass: {
    type: String,
    required: false,
    default: '',
  },
})

let IconComponent = null

if (props.icon) {
  IconComponent = defineAsyncComponent(
    () => import(`@/components/icons/${props.icon}.vue`),
  )
}

const goToLogin = () => {
  emit('loginClick')
}
</script>

<template>
  <button :class="buttonClass" @click="goToLogin">
    <span v-if="IconComponent" class="icon">
      <component :is="IconComponent" :color="props.iconColor" />
    </span>
    <span if="label">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;
  padding-right: 12px;
}
</style>
