<template>
  <teleport to="#modalWrapper">
    <div
        class="h-dialog"
        :class="classes"
    >
      <transition name="h-dialog">
        <div
            v-show="modelValue"
            class="h-dialog__wrapper"
            :style="wrapperStyles"
            ref="wrapper"
        >
          <div
              class="h-dialog__window"
              :style="windowStyles"
          >
            <div class="h-dialog__content">
              <slot></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import {defineComponent, watch, nextTick, ref, computed, onMounted, onBeforeUnmount} from "vue";
import freeZIndexGetter from "../../utils/freeZIndexGetter";
import listenerBuilder from "../../utils/listenerBuilder";
import {disableAppScroll, enableAppScroll} from "../../utils/scrollDisabler";

const StartZIndex = 300;

export default defineComponent({
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: undefined
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    title: {
      type: [String, Number],
      default: ''
    },
    hideCloseButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const zIndex = ref('');

    watch(() => props.modelValue, (val) => nextTick(() => val ? onOpen() : onClose()))

    const onOpen = () => nextTick(() => {
      zIndex.value = freeZIndexGetter('.h-dialog__wrapper', StartZIndex);
      disableAppScroll();
    });

    const wrapper = ref();

    const onClose = () => {
      zIndex.value = '';
      !document.querySelector('.h-dialog--active') && enableAppScroll();
    };

    const windowStyles = computed(() => ({
      width: props.maxWidth ? `${props.maxWidth}px` : ''
    }))

    const wrapperStyles = computed(() => ({
      zIndex: zIndex.value
    }))

    const classes = computed(() => ({
      'h-dialog--persistent': props.persistent,
      'h-dialog--active': props.modelValue
    }))

    const closeModal = () => {
      emit('update:modelValue', false);
    }

    let wrapperIsPressed = false;

    const addListeners = () => {
      removeListeners();
      listenerBuilder.addListener('mousedown', wrapper.value, (event) => {
        if (props.modelValue && event.target === wrapper.value) {
          wrapperIsPressed = true;
        }
      });
      listenerBuilder.addListener('mouseup', wrapper.value, (event) => {
        (props.modelValue && wrapperIsPressed && event.target === wrapper.value) && closeModal();
        wrapperIsPressed = false;

      });
    }

    const removeListeners = () => {
      listenerBuilder.removeListener('click', wrapper.value);
    }

    watch(() => props.persistent, (val) => {
      !val ? addListeners() : removeListeners();
    })

    onMounted(() => {
      !props.persistent && addListeners();
      props.modelValue && onOpen();
    })

    onBeforeUnmount(() => {
      removeListeners();
      props.modelValue && onClose();
    })

    return {
      classes,
      wrapperStyles,
      wrapper,
      windowStyles,
      closeModal
    }
  }
})
</script>