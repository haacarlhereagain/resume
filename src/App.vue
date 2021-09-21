<template v-cloak>
  <div id="modalWrapper"></div>
  <resume></resume>
</template>

<script>
import {defineComponent, ref} from 'vue'
import Resume from './components/resume.vue'
import listenerBuilder from "./shared/utils/listenerBuilder";

export default defineComponent({
  name: 'App',
  components: {
    Resume
  }
})
</script>
