<template>
    <div class="main-data">
        <template v-if="dataIsReady">
            <div class="main-data__about-me">
                <h1>{{ name }}</h1>
                <span>{{ role }}</span>
            </div>
            <div class="main-data__socials">
                <div
                    class="main-data__item"
                    v-for="(contact, key) in notClickedContacts"
                    :key="key"
                >
                    <span :class="`main-data__icon ${ContactIconMap[key]}`"></span>
                    <span>{{ contact }}</span>
                </div>
                <div
                    class="main-data__item"
                    v-for="(contact, key) in clickedContacts"
                    :key="key"
                >
                    <span :class="`main-data__icon ${ContactIconMap[key]}`"></span>
                    <a :href="contact.link">{{ contact.text }}</a>
                </div>
            </div>
        </template>
        <img class="main-data__avatar" :src="'./img/avatar.jpg'" alt="">
    </div>
</template>

<script>
	import {defineComponent, computed} from 'vue'
	import {useStore} from 'vuex'
	import {ContactIconMap} from "../const";

	export default defineComponent({
		setup() {
			const $store = useStore();
			const data = computed(() => $store.getters.mainData);
			const notClickedContacts = computed(() => data.value.contacts.notClicked)
			const clickedContacts = computed(() => data.value.contacts.clicked)

			const name = computed(() => data.value.name);
			const role = computed(() => data.value.role);
			const dataIsReady = computed(() => $store.getters.dataIsReady);

			return {
				ContactIconMap,
				name,
				role,
				notClickedContacts,
				clickedContacts,
				dataIsReady
			}
		}
	})
</script>

<style lang="scss" scoped>
    .main-data {
        height: 330px;
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

        .main-data__about-me {
            color: #fff;
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
            color: #cccccc;
            position: relative;
            z-index: 3;

            .main-data__item {
                display: flex;
                flex-direction: row;
                align-items: center;
                color: #cccccc;

                &:not(:first-child) {
                    margin-top: 7px;
                }

                .main-data__icon {
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
        }

        @media (max-width: 799px) {
            .main-data__avatar {
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
                }
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
