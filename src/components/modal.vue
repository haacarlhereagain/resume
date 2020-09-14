<template>
  <div
    class="modal"
    :class="{ 'modal--opened' : is_opened }"
  >
    <div
      ref="modal_content"
      class="modal__wrapper"
      :style="`max-width: ${width}`"
    >
      <div class="modal__container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            width: {
                default() {
                    return 'calc(100vw - 48px)'
                }
            },
            value: {}
        },
        data() {
            return {
                close_modal_func: null,
                is_opened: false
            }
        },
        methods: {
            openModal() {
                this.is_opened = true;
                this.$refs.modal_content.style.display = 'block';
            },
            async closeModal() {
                this.$emit('input', false);
                this.$el.classList.add('modal--out');
                setTimeout(() => {
                    this.$el.classList.remove('modal--out');
                    this.is_opened = false;
                    this.close_modal_func = null;
                    this.$refs.modal_content.style.display = 'none';
                }, 170)
            },
            checkClickEsc() {
                if (event.key !== 'Escape') return;
                this.closeModal();
            }
        },
        watch: {
            value(new_val) {
                if (new_val) {
                    this.openModal();
                    this.close_modal_func = this.checkClickEsc.bind(this);
                    document.addEventListener('keydown', this.close_modal_func);
                } else {
                    document.removeEventListener('keydown', this.close_modal_func);
                    this.closeModal();
                }
            }
        }
    }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    height: 100vh;
    width: 100%;
    left: 0px;
    top: 0px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #00000053;
    display: flex;
    transition: .3s;
    z-index: 5;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;

    &.modal--opened {
      animation: IN 200ms;
      opacity: 1;
      pointer-events: auto;
    }

    @keyframes IN {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &.modal--out {
      animation: OUT 200ms;
    }

    @keyframes OUT {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .modal__wrapper {
      border-radius: 6px;
      background: #fff;
      overflow: hidden;
      .modal__container {
        max-height: 90vh;
        overflow: auto;
        padding: 12px 20px 20px;
      }
    }
  }
</style>
