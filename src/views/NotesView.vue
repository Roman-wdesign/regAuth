<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Note {
  id: number
  title: string
  content: string
  isEditing: boolean
}

import TheButton from '@/components/TheButton.vue'

const notes = ref<Note[]>([])

// Загрузка заметок из localStorage при загрузке компонента
onMounted(() => {
  const storedNotes = localStorage.getItem('notes')
  if (storedNotes) {
    notes.value = JSON.parse(storedNotes)
  }
})

// Сохранение заметок в localStorage
const saveNotesToLocalStorage = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value))
}

// Добавление новой заметки
const addNote = () => {
  const newNote: Note = {
    id: Date.now(),
    title: '',
    content: '',
    isEditing: true,
  }
  notes.value.push(newNote)
  saveNotesToLocalStorage()
}

// Сохранение изменений
const saveNote = (id: number) => {
  const note = notes.value.find(note => note.id === id)
  if (note) {
    note.isEditing = false
    saveNotesToLocalStorage()
  }
}

// Удаление заметки
const deleteNote = (id: number) => {
  notes.value = notes.value.filter(note => note.id !== id)
  saveNotesToLocalStorage()
}
</script>

<template>
  <div class="notes-page">
    <!-- Список заметок -->
    <div class="notes-list">
      <div v-for="note in notes" :key="note.id" class="note-item">
        <div class="note-box" v-if="note.isEditing">
          <input
            v-model="note.title"
            placeholder="Заголовок заметки"
            class="note-input"
          />
          <div class="note-textarea">
            <textarea
              rows="5"
              cols="33"
              v-model="note.content"
              placeholder="Текст заметки"
            ></textarea>
          </div>

          <button @click="saveNote(note.id)">Добавить</button>
        </div>
        <div v-else>
          <h4 class="title-note">{{ note.title }}</h4>
          <p>{{ note.content }}</p>
          <!-- <button @click="note.isEditing = true" class="edit-btn">
            Редактировать
          </button> -->
          <TheButton
            @click="deleteNote(note.id)"
            class="delete-btn"
            :hasPadding="true"
            label="Удалить"
            icon="IconClose"
          />
        </div>
      </div>
    </div>

    <!-- Кнопка для создания новой заметки -->
    <TheButton
      @click="addNote"
      class="create-note-btn"
      :hasPadding="false"
      label=""
      icon="IconAdd"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

.title-note {
  border-bottom: 1px solid $grey;
}

.notes-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.note-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.note-input,
.note-textarea {
  font-size: $text-font-size-normal;
  min-width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.notes-list {
  display: flex;
  flex-direction: column;
}

.note-box {
  display: flex;
  flex-direction: column;
}

.note-item {
  min-width: 300px;
  width: 100%;
  min-height: 300px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: $green-light;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;
}

.create-note-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: $green-middle;
  color: white;
  padding: 20px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.edit-btn,
.delete-btn {
  background: transparent;
  border: none;
  color: $white;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  right: 0;

  padding: 0 20px 20px 0;
}
</style>
