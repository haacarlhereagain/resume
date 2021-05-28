<template>
  <div class="container">
    <lang-toggle></lang-toggle>
    <template v-if="currentLocale">
      <main-data></main-data>
      <works-places-modal class="mt-6"></works-places-modal>
      <additional-data class="mt-6"></additional-data>
      <div class="flex-row mt-6 thx">{{ thx }}</div>
    </template>
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex';
import LangToggle from "./LangToggle";
import MainData from "./MainData";
import WorksPlacesModal from "./WorksPlacesModal";
import AdditionalData from './AdditionalData'
import Modal from "./Modal";

export default defineComponent({
  components: {
    LangToggle,
    MainData,
    WorksPlacesModal,
    AdditionalData,
    Modal
  },
  setup() {
    const $store = useStore();
    const thx = computed(() => $store.getters.translateData.thx);

    const currentLocale = computed(() => !!$store.getters.currentLocale);

    return {
      thx,
      currentLocale,
    }
  }
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container {
  margin: 0 auto;
  width: 1200px;
  padding: 0px 16px;
  max-width: calc(100% - 32px);

  @media (max-width: 599px) {
    padding: 0px;
  }

  .thx {
    justify-content: center;
    padding: 0px 20px 24px;
  }
}
</style>
