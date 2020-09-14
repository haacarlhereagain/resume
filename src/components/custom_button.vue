<template>
  <button
    class="button"
    @click="$emit('click')"
  >
    <div class="button__content">
      <slot></slot>
    </div>
  </button>

</template>

<script>
    export default {
        data() {
            return {
                button_ripple: null
            }
        },
        mounted() {
            this.button_ripple = new this.$ripple(this.$el.children[0]);
        }
    }
</script>

<style lang="scss" scoped>
  .button {
    user-select: none;
    outline: none;
    display: inline-block;
    border: none;
    cursor: pointer;
    height: 40px;
    background: transparent;

    .button__content {
      text-transform: uppercase;
      padding: 10px 16px;
      background: transparent;
      border-radius: 6px;
      transition: 150ms;
      vertical-align: center;
      letter-spacing: 1px;
      color: #54007a;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;

      &:hover {
        background: #54007a10;
      }
    }
  }
</style>
