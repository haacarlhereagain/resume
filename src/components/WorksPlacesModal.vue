<template>
    <div class="flex-row works-places-modal">
        <button class="button" @click="showModal">опыт работы</button>
        <modal
            v-model:isOpened="modal"
            :max-width="950"
            :persistent="true"
        >
            <div class="modal__content">
                <div class="modal__title">
                    <div class="modal__title-text">
                        {{ title }}
                    </div>
                    <button class="button button--close" @click="closeModal">
                        <span class="mdi mdi-close"></span>
                    </button>
                </div>
                <div class="modal__main-data">
                    <card
                        v-for="(work, index) in worksPlaces"
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
	import {defineComponent, computed, ref} from 'vue'
	import {useStore} from 'vuex'
	import Modal from "./Modal";
	import Card from "./Card";

	export default defineComponent({
		components: {
			Modal,
			Card
		},
		setup() {
			const $store = useStore();

			let modal = ref(false);
			const modalWorksPlaces = computed(() => $store.getters.modalWorksPlaces);
			const showModal = () => modal.value = true;
			const closeModal = () => modal.value = false;
			const title = computed(() => modalWorksPlaces.value.title);
			const worksPlaces = computed(() => modalWorksPlaces.value.worksPlaces);
			return {
				modal,
				showModal,
				closeModal,
				title,
				worksPlaces
			}
		}
	})

</script>

<style lang="scss" scoped>

    .works-places-modal {
        justify-content: flex-end;
    }

    .modal__content {
        display: flex;
        flex: 1 1 100%;
        flex-direction: column;
        max-height: 100%;
        max-width: 100%;

        .modal__title {
            width: 100%;
            background-color: #fff;
            padding: 12px 20px 0px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: bolder;

            .button--close {
                font-size: 20px;
                padding: 8px 12px;
                .mdi-close {
                    height: 20px;
                    width: 20px;
                }
            }
        }

        .modal__main-data {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            overflow: auto;
            padding: 10px 20px 20px;

            .card {
                width: calc(50% - 10px);
                &:nth-child(1n+3) {
                    margin-top: 20px;
                }
            }
        }
    }

    @media (max-width: 850px) {
        .modal__content {
            .modal__title {
                padding: 5px 12px;
                border-bottom: 1px solid #e8e8e8;
            }

            .modal__main-data {
                padding: 10px 12px 12px;

                .card {
                    width: 100% !important;

                    &:not(:first-child) {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
