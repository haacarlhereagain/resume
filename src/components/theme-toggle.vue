<template>
  <div
      class="theme-toggle"
      @click="colorTheme.toggleTheme"
  >
    <span
        class="mdi"
        :class="iconClass"
    ></span>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import colorTheme from "../utils/colorTheme";

export default defineComponent({
  setup() {

    const iconClass = computed(() => ({
      'mdi-lightbulb-off': colorTheme.themeIsDark,
      'mdi-lightbulb': !colorTheme.themeIsDark
    }))

    return {
      colorTheme,
      iconClass
    }
  }
})
</script>

<style lang="scss" scoped>
.theme-toggle {
  cursor: pointer;

  .mdi {
    font-size: 20px;

    &-lightbulb {
      color: gold;
    }

    &-lightbulb-off {
      color: gray;
    }
  }
}
</style>