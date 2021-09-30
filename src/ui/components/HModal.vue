<template>
  <teleport to="#modalWrapper">
    <div
        class="h-modal"
        :class="classes"
    >
      <transition name="h-modal">
        <div
            v-show="modelValue"
            class="h-modal__wrapper"
            :style="wrapperStyles"
            ref="wrapper"
        >
          <div
              class="h-modal__window"
              :style="windowStyles"
          >
            <div class="h-modal__content">
              <slot></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import {defineComponent} from "vue";
import {hModalEmits, hModalProps, useHModal} from "../component-settings/h-modal";

export default defineComponent({
  name: 'HModal',
  props: hModalProps,
  emits: hModalEmits,
  setup(props, {emit}) {
    return useHModal({props, emit});
  }
})
</script>