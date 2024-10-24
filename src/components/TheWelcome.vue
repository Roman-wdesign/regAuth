<script setup lang="ts"></script>

<template>
  <div class="welcome">
    <div class="welcome_text-block">
      <h1>
        Мои <br />
        заметки
      </h1>
      <h3>
        Не забывай о важном, <br />
        храни его в облаке.
      </h3>
    </div>

    <div class="svg-container">
      <img src="@/components/picture/picture.svg" alt="Large SVG" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/vars.scss' as *;

@media (min-width: $breakpoint-small) {
  .welcome {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    min-height: 100vh;
    position: relative;
  }

  .svg-container {
    width: 100%;
    max-width: 298px;
    height: auto;

    position: absolute;
    bottom: 0;
  }

  img {
    width: 100%;
    height: auto;
  }

  h1 {
    font: {
      family: $heading-font-family;
      size: $h1-font-size-mob;
      weight: $font-black-weight;
    }
  }

  h3 {
    font: {
      family: $heading-font-family;
      size: $h3-font-size-mob;
      weight: $font-regular-weight;
    }
  }
}

@media (min-width: $breakpoint-medium) {
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}

@media (min-width: $breakpoint-large) {
  .welcome {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

@media (min-width: $breakpoint-xlarge) {
  .welcome {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
