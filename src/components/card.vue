<template>
  <div class="card">
    <div class="card__title border-bottom default-text">{{ data.title }}</div>
    <div class="card__content">
      <div
          class="card__item default-text"
          v-for="(item, index) in data.values"
          :key="index"
      >
        <template v-if="typeof item === 'object'">
          <span class="card__item-name support-text">{{ item.name }}</span>
          <span class="card__item-value default-text" v-if="!item.value.includes('http')">{{ item.value }}</span>
          <a class="card__item-value link-text" :href="item.value" v-else>{{ item.value }}</a>
        </template>
        <template v-else>
          {{ item }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue';

export default defineComponent({
  props: ['data'],
  setup(props) {
    const data = computed(() => props.data);

    return {
      data
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  padding: 12px 18px;

  .card__title {
    font-size: 20px;
    font-weight: bolder;
    padding: 0px 0px 8px;
    @media (max-width: 599px) {
      font-size: 16px;
    }
  }

  .card__content {
    font-size: 16px;
    padding: 8px 0px 0px;
    overflow: hidden;

    .card__item {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 16px;

      @media (max-width: 599px) {
        font-size: 14px;
      }

      &:not(:first-child) {
        margin-top: 10px;
      }

      .card__item-name {
        text-align: left;
        width: 100%;
      }
    }
  }
}
</style>
