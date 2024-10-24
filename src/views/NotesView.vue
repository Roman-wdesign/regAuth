<script setup lang="ts">
import { ref } from 'vue'
import { createNote } from '@/api/notes'

const emit = defineEmits(['note-created'])
const title = ref('')
const content = ref('')

const handleSubmit = async () => {
  await createNote(title.value, content.value)
  title.value = ''
  content.value = ''
  emit('note-created')
}
</script>
<template>
  <div class="note-form">
    <input v-model="title" placeholder="Note title" />
    <textarea v-model="content" placeholder="Note content"></textarea>
    <button @click="handleSubmit">Create Note</button>
  </div>
</template>
