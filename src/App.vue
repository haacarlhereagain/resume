<template>
  <div id="app">
    <resume></resume>
  </div>
</template>

<script>
    import Resume from './components/resume.vue'

    export default {
        components: {
            Resume
        }
    }
</script>

<style>
  #app {
    min-height: 100vh;
  }
  * {
    font-family: 'Century Gothic';
    text-decoration: none;
    box-sizing: border-box;
  }
</style>
