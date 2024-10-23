<script setup lang="ts">
const props = defineProps({
  width: {
    type: [String, Number],
    default: 16,
  },
  height: {
    type: [String, Number],
    default: 16,
  },
  color: {
    type: String,
    default: 'white',
  },
})
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9H17M9 1L9 17"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
