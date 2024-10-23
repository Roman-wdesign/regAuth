<script setup lang="ts">
const props = defineProps({
  width: {
    type: [String, Number],
    default: 18,
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
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="14"
      rx="3"
      stroke="#B1C909"
      stroke-width="2"
    />
    <path
      d="M4 5L7.75061 8.00049C8.48105 8.58484 9.51895 8.58484 10.2494 8.00049L14 5"
      stroke="#B1C909"
      stroke-width="2"
    />
  </svg>
</template>
