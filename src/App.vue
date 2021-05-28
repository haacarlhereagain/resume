<template v-cloak>
  <div class="main-bg-img"></div>
  <resume></resume>
</template>

<script>
import {defineComponent} from 'vue'
import Resume from './components/Resume.vue'

export default defineComponent({
  name: 'App',
  components: {
    Resume
  }
})
</script>

<style lang="scss" scoped>
.main-bg-img {
  position: absolute;
  width: 100%;
  height: 300px;
  background-image: url('../public/img/main-bg-img.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: -1;
  box-shadow: 0 0 100px 10px #605c61;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #0303033a;
  }
}
</style>
