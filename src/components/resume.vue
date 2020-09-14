<template>
  <div class="resume">
    <div class="main-bg-img"></div>
    <div class="container">
      <lang-toggle
        :languages="languages"
        v-model="selected_lang"
      ></lang-toggle>
      <contacts
        :main_data="main_data"
        :contacts="data.contacts"
      ></contacts>
      <general-data
        :data="general_data"
        @toggle-modal="modal=true"
      ></general-data>
    </div>

    <modal
      v-model="modal"
    >
      <div class="modal__content">
        <div class="modal__title">
          <div class="modal__title-text">
            {{ modal_data.title_text }}
          </div>
          <custom-button
            @click="modal=false"
          >
            <span class="modal__button-close-icon mdi mdi-close"></span>
          </custom-button>
        </div>
        <div class="modal__main-data">
          <card
            v-for="(work, index) in modal_data.data"
            :key="index"
            :light="true"
            :data="work"
          ></card>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
    import LangToggle from './lang_toggle.vue'
    import Contacts from './contacts.vue'
    import GeneralData from './general_data.vue'
    import Modal from './modal.vue'
    import CustomButton from './custom_button.vue'
    import Card from './card.vue'

    export default {
        components: {
            LangToggle,
            Contacts,
            GeneralData,
            Modal,
            CustomButton,
            Card
        },
        data() {
            return {
                mobile: false,
                languages: ['ru', 'eng'],
                selected_lang: 'ru',
                modal: false,
                age: null,
                data: {
                    ru: {
                        main_data: {
                            name: 'Александр Халиветов',
                            role: 'Фронтенд разработчик'
                        },
                        description: [
                            'Здравствуйте, меня зовут Александр и я являюсь фронтенд-разработчиком.',
                            'В данный момент я рассматриваю новое место работы.'
                        ],
                        skills: {
                            title: 'Мои навыки',
                            values: [
                                'Отличное знание HTML5, CSS3, JS',
                                'Уверенное знание Vue, Vuex, Vue-router, Vuetify, Webpack',
                                'Хорошо знаком с JQuery, Bootstrap4, SASS',
                                'Знание ряда JS-библиотек (moment.js, chart.js и др.)',
                                'Имею опыт работы с Git'
                            ]
                        },
                        about_me: {
                            title: 'Обо мне',
                            values: [
                                `Мне ${this.getAge('ru')}, окончил ВУЗ (кафедра ИКТ), военный билет на руках`,
                                'Быстро обучаем, готов к активной коммуникации и дальнейшему развитию',
                                'Ответственен и исполнителен',
                                'Знание английского пока что на низком уровне'
                            ]
                        },
                        footer: [
                            'Если Вас заинтересовала моя кандидатура, то я готов выполнить Ваше тестовое задание.',
                            'Спасибо, что просмотрели мое портфолио!'
                        ],
                        text_work_button: 'Предыдущая работа',
                        modal: {
                            title: 'Предыдущие места работы',
                            data: [
                                {
                                    title: 'Веб-студия "Некстайп"',
                                    values: [
                                        {name: 'Срок', value: 'С мая 2019 г. по июнь 2019 г.'},
                                        {name: 'Должность', value: 'Стажер-верстальщик'},
                                        {name: 'Деятельность', value: 'Натягивание" сверстанных блоков на битрикс'},
                                        {name: 'Сайт', value: 'https://nextype.ru/'},
                                    ]
                                },
                                {
                                    title: 'ООО "Япоки"',
                                    values: [
                                        {name: 'Срок', value: 'С августа 2019 г. по н.в.'},
                                        {name: 'Должность', value: 'Фронтент-разработчик'},
                                        {name: 'Деятельность', value: 'Разработка клиентской части ИС'},
                                        {name: 'Сайт', value: 'https://yapoki.ru/'},
                                    ]
                                }
                            ]
                        }

                    },
                    eng: {
                        main_data: {
                            name: 'Alexander Khalivetov',
                            role: 'Frontend developer'
                        },
                        description: [
                            "Hello, my name is Alexandr and i'm a frontend developer.",
                            "I'm looking for a job now."
                        ],
                        skills: {
                            title: 'My skills',
                            values: [
                                'Excellent knowledge HTML5, CSS3, JS',
                                'Confident knowledge Vue (Vuex, vue-router), Vuetify, Webpack',
                                'Good Knowledge JQuery, Bootstrap4, SASS',
                                'I know several js-libraries (moment.js, chart.js, etc.)',
                                'I have experience working with Git.'
                            ]
                        },
                        about_me: {
                            title: 'About me',
                            values: [
                                `I am ${this.getAge('eng')} years old, i'm graduated from University (South Ural state University, Department of ICT), i have military ID.`,
                                'Ready for active communication and further development.',
                                'Responsible, executive',
                                "I don't know much English yet"
                            ]
                        },
                        footer: [
                            'If You are interested in my candidacy, I am ready to perform Your test task.',
                            'Thank you for looking my portfolio!'
                        ],
                        text_work_button: 'Past work',
                        modal: {
                            title: 'Previous jobs',
                            data: [
                                {
                                    title: 'Web studio "Некстайп"',
                                    values: [
                                        {name: 'Period', value: 'From may 2019 to June 2019'},
                                        {name: 'Position', value: 'Trainee layout designer'},
                                        {name: 'Activity', value: 'Implementation of ready-made blocks on Bitrix'},
                                        {name: 'Website', value: 'https://nextype.ru/'},
                                    ]
                                },
                                {
                                    title: 'ООО "Япоки"',
                                    values: [
                                        {name: 'Period', value: 'From August 2019 to now'},
                                        {name: 'Position', value: 'Frontend developer'},
                                        {
                                            name: 'Activity',
                                            value: 'Development of the client part of the Information System'
                                        },
                                        {name: 'Website', value: 'https://yapoki.ru/'},
                                    ]
                                }
                            ]
                        }

                    },
                    contacts: {
                        email: {
                            text: 'haacarlhereagain@gmail.com',
                            icon: 'email-outline'
                        },
                        phone: {
                            text: '+7-900-070-75-64',
                            icon: 'phone'
                        },
                        skype: {
                            text: 'halcin69',
                            icon: 'skype'
                        },
                        github: {
                            link: 'https://github.com/CarolusXII',
                            text: 'GitHub',
                            icon: 'github'
                        },
                        instagram: {
                            link: 'https://www.instagram.com/khalivetoff_/',
                            text: 'Instagram',
                            icon: 'instagram'
                        }
                    }
                }
            }
        },
        methods: {
            getAge(lang) {
                let age = this.$moment().diff(this.$moment('1996-12-18'), 'year');
                if (lang == 'ru') {
                    if (['2', '3', '4'].includes(age.toString()[1])) {
                        return `${age} года`;
                    } else if (['0', '5', '6', '7', '8', '9'].includes(age.toString()[1])) {
                        return `${age} лет`;
                    } else {
                        return `${age} год`;
                    }
                } else {
                    return age;
                }
            }
        },
        computed: {
            main_data() {
                return this.data[this.selected_lang].main_data;
            },
            general_data() {
                return this.data[this.selected_lang];
            },
            modal_data() {
                return {
                    title_text: this.data[this.selected_lang].modal.title,
                    data: this.data[this.selected_lang].modal.data
                }
            }
        }
    }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .resume {
    .container {
      margin: 0 auto;
      width: 1200px;
      padding: 0px 16px;
      max-width: calc(100% - 32px);
    }

    .main-bg-img {
      position: absolute;
      width: 100%;
      height: 300px;
      background-image: url('../static/img/main_bg_img.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: -1;
      box-shadow: 0 0 100px 10px #605c61;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #0303033a;
      }
    }

    .modal__content {

      .modal__title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        .button {
          .button__content {
            padding: 5px 10px;
            .modal__button-close-icon {
              font-size: 20px;
            }
          }
        }
      }

      .modal__main-data {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;

        .card {
          width: calc(50% - 10px);
          &:nth-child(1n+3) {
            margin-top: 20px;
          }
        }
      }
    }
  }

  @media (max-width: 850px) {
    .modal__content {
      .card {
        width: 100% !important;

        &:not(:first-child) {
          margin-top: 10px;
        }
      }
    }
  }

  @media (max-width: 599px) {
    .resume {
      .container {
        padding: 0px;

        .contacts {
          padding: 15px 5%;
        }
      }
    }
  }
</style>
