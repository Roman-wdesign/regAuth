<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
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

// Если передана иконка, загружаем компонент
if (props.icon) {
  IconComponent = defineAsyncComponent(
    () => import(`@/components/icons/${props.icon}.vue`),
  )
}
</script>

<template>
  <button :class="buttonClass">
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
  margin-right: 12px;
}
</style>
