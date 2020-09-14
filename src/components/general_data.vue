<template>
  <div class="main-data">
    <div class="main-data__top-content">
      <div class="main-data__description">
        <span
          v-for="(item, index) in data.description"
          :key="index"
          class="main-data__top-content-item"
        >
          {{ item  }}
        </span>
      </div>
      <custom-button
        class="button--work"
        @click="$emit('toggle-modal')"
      >
        {{ data.text_work_button }}
      </custom-button>
    </div>
    <div class="main-data__main-content">
      <card
        :data="data.skills"
        light="true"
      ></card>
      <card
        :data="data.about_me"
        light="true"
      ></card>
    </div>
    <div class="main-data__bottom-content">
      <span
        v-for="(item, index) in data.footer"
        :key="index"
        class="main-data__top-content-item"
      >
          {{ item  }}
        </span>
    </div>
  </div>
</template>

<script>
    import CustomButton from './custom_button.vue'
    import Card from './card.vue'

    export default {
        components: {
            CustomButton,
            Card
        },
        props: ['data']
    }
</script>

<style lang="scss">
  .main-data {
    .main-data__top-content {
      padding: 0px 20px;
      margin-top: 28px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .button--work {
        margin-top: 10px;
      }
      .main-data__description {
        display: flex;
        flex-direction: column;
        color: #050017;

        .main-data__top-content-item:not(:first-child) {
          margin-top: 8px;
        }
      }
    }
    .main-data__main-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 28px;
      .card {
        width: calc(50% - 10px);
      }
    }
    .main-data__bottom-content {
      padding: 0px 20px 20px;
      margin-top: 28px;
      display: flex;
      flex-direction: column;
      color: #050017;

      .main-data__top-content-item:not(:first-child) {
        margin-top: 8px;
      }
    }
  }
  @media (max-width: 799px) {
    .card {
      width: 100%!important;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
</style>
