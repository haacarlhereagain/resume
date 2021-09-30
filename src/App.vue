<template v-cloak>
  <resume></resume>
</template>

<script>
import {defineComponent} from 'vue'
import Resume from './components/resume.vue'

export default defineComponent({
  name: 'App',
  components: {
    Resume
  }
})
</script>
