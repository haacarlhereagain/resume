<template>
  <div class="main-data card">
    <div class="main-data__about-me">
      <h1 class="default-text">{{ mainData.name }}</h1>
      <span class="default-text--side">{{ mainData.role }}</span>
    </div>
    <div class="main-data__socials">
      <div
          class="main-data__item default-text"
          v-for="(contact, key) in notClickedContacts"
          :key="key"
      >
        <span :class="`main-data__icon ${contact.icon}`"></span>
        <span>{{ contact.text }}</span>
      </div>
      <div
          class="main-data__item"
          v-for="(contact, key) in clickedContacts"
          :key="key"
      >
        <a
            class="main-data__item link-text"
            :href="contact.link"
        >
          <span :class="`main-data__icon ${contact.icon}`"></span>
          <span>{{ contact.text }}</span>
        </a>
      </div>
    </div>
    <img class="main-data__avatar" :src="'./img/avatar.jpg'" alt="">
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue'
import {useStore} from 'vuex';

export default defineComponent({
  setup() {
    const $store = useStore();
    const mainData = computed(() => $store.getters.translateData.mainData)
    const notClickedContacts = computed(() => mainData.value.contacts.notClicked);
    const clickedContacts = computed(() => mainData.value.contacts.clickable);

    return {
      mainData,
      notClickedContacts,
      clickedContacts,
    }
  }
})
</script>

<style lang="scss" scoped>

.main-data {
  height: 330px;
  padding: 30px 55px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    height: 800px;
    width: 800px;
    transform: rotate(65deg);
    right: 300px;
    top: 0px;
    //background-color: $card;
    position: absolute;
    z-index: 2;
  }

  .main-data__about-me {
    position: relative;
    z-index: 3;

    h1 {
      font-size: 40px;
      line-height: 40px;
      white-space: nowrap;
    }

    span {
      font-size: 18px;
    }
  }

  .main-data__socials {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 3;

    .main-data__item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &:not(:first-child) {
        margin-top: 7px;
      }

      .main-data__icon {
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }

  .main-data__avatar {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 1;
    opacity: 1;
    transition: 80ms;
    user-select: none;
    pointer-events: none;

    @media (max-width: 799px) {
      opacity: 0;
    }
  }

}

@media (max-width: 599px) {
  .main-data {
    padding: 15px 5%;

    .main-data__about-me {
      h1 {
        white-space: normal;
        font-size: 30px;
      }

      span {
        font-size: 14px;
      }
    }

    .main-data__socials {
      font-size: 14px;
    }
  }
}

@media (max-width: 535px) {
  .main-data {
    height: 340px;

    .main-data__about-me {
      max-width: 300px;
    }
  }
}
</style>
