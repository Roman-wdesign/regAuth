<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
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
  hasPadding: {
    type: Boolean,
    required: false,
    default: false,
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
    <span
      v-if="IconComponent"
      class="icon"
      :class="{ 'padded-icon': hasPadding }"
    >
      <component :is="IconComponent" :color="props.iconColor" />
    </span>
    <span if="label">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;
}

.padded-icon {
  padding-right: 12px;
}
</style>
