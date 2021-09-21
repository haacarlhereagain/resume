<template>
  <div class="container">
    <div class="settings">
      <lang-toggle></lang-toggle>
      <div class="settings__separator default-text"></div>
      <theme-toggle></theme-toggle>
    </div>
    <template v-if="currentLocale">
      <main-data></main-data>
      <works-places-modal class="mt-6"></works-places-modal>
      <additional-data class="mt-6"></additional-data>
      <div class="flex-row mt-6 default-text thx">{{ thx }}</div>
    </template>
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex';
import LangToggle from "./lang-toggle";
import MainData from "./main-data";
import WorksPlacesModal from "./work-places-modal";
import AdditionalData from './additional-data'
import ThemeToggle from './theme-toggle.vue';

export default defineComponent({
  components: {
    LangToggle,
    MainData,
    WorksPlacesModal,
    AdditionalData,
    ThemeToggle
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

  .settings {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;

    .settings__separator {
      margin: 0px 5px;
      border-left: solid 1px;
      height: 20px;
      width: 5px;
    }
  }

  @media (max-width: 599px) {
    padding: 0px;
  }

  .thx {
    justify-content: center;
    padding: 0px 20px 24px;
  }
}
</style>
