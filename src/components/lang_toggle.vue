<template>
  <div class="lang-toggle">
    <span
      class="lang-toggle__button"
      v-for="(lang, index) in languages"
      :key="index"
      @click="$emit('input', lang)"
      :class="{ 'selected' : lang === value }"
    >{{ lang }}</span>
  </div>
</template>

<script>
  export default {
      props: ['languages', 'value']
  }
</script>

<style lang="scss">
  .lang-toggle {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 40px;
    user-select: none;
    .lang-toggle__button {
      color: #ffffff4f;
      margin: 0px 5px;
      cursor: pointer;
      text-transform: uppercase;
      transition: 150ms;
    }
    .lang-toggle__button:hover {
      color: #ffffff7d;
    }
    .lang-toggle__button.selected {
      color: #ffffffb1;
    }
  }
</style>
