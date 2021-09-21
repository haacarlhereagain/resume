<template>
  <div class="flex-row additional-data">
    <card :data="skillz"></card>
    <card :data="aboutMe"></card>
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex'
import Card from "./card";

export default defineComponent({
  components: {
    Card
  },
  setup() {
    const $store = useStore();

    const skillz = computed(() => $store.getters.translateData.skillz);
    const aboutMe = computed(() => $store.getters.translateData.aboutMe);

    return {
      skillz,
      aboutMe
    }
  }
})

</script>

<style lang="scss" scoped>
.additional-data {
  justify-content: space-between;
  flex-wrap: wrap;

  .card {
    width: calc(50% - 10px);
  }
}

@media (max-width: 599px) {
  .additional-data {
    .card {
      width: 100%;

      &:not(:first-child) {
        margin-top: 18px;
      }
    }
  }
}
</style>
