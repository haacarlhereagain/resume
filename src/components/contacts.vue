<template>
  <div class="contacts">
    <div class="contacts__about-me">
      <h1>{{ main_data.name }}</h1>
      <span>{{ main_data.role }}</span>
    </div>
    <div class="contacts__socials">
      <div
        class="contacts__item"
        v-for="(contact, key) in contacts"
        :key="key"
      >
        <span :class="`contacts__icon mdi mdi-${contact.icon}`"></span>
        <template v-if="contact.link === undefined">
          <span>{{ contact.text }}</span>
        </template>
        <template v-else>
          <a :href="contact.link">{{ contact.text }}</a>
        </template>
      </div>
    </div>
    <img class="contacts__avatar" :src="'./static/img/avatar.jpg'" alt="">
  </div>
</template>

<script>
    export default {
        props: ['main_data', 'contacts']
    }
</script>

<style lang="scss">
  .contacts {
    background: #57007f;
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
      background: #57007f;
      position: absolute;
      z-index: 2;
    }

    .contacts__about-me {
      color: #fff;
      position: relative;
      z-index: 3;

      h1 {
        font-size: 40px;
        line-height: 40px;
      }

      span {
        font-size: 18px;
      }
    }

    .contacts__socials {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      color: #cccccc;
      position: relative;
      z-index: 3;

      .contacts__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #cccccc;

        &:not(:first-child) {
          margin-top: 7px;
        }

        .contacts__icon {
          font-size: 25px;
          margin-right: 5px;
          color: #050017;
        }

        a {
          color: #cccccc;
          transition: 150ms;

          &:hover {
            color: #fff
          }
        }
      }
    }

    .contacts__avatar {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      z-index: 1;
      opacity: 1;
      transition: 80ms;
      user-select: none;
      pointer-events: none;
    }
    @media (max-width: 799px) {
      .contacts__avatar {
        opacity: 0;
      }
    }
  }
</style>
