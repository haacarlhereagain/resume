<template>
    <div class="container">
        <lang-toggle></lang-toggle>
        <main-data></main-data>
        <template v-if="dataIsReady">
            <works-places-modal class="mt-6"></works-places-modal>
            <additional-data class="mt-6"></additional-data>
            <div class="flex-row mt-6 thx">{{ thx }}</div>
        </template>
    </div>
</template>

<script>
	import {defineComponent, onBeforeMount, computed, onMounted} from 'vue'
	import {useStore} from 'vuex'
	import {DefaultLang} from "../const";
	import LangToggle from "./LangToggle";
	import MainData from "./MainData";
	import WorksPlacesModal from "./WorksPlacesModal";
	import AdditionalData from './AdditionalData'

	export default defineComponent({
		components: {
			LangToggle,
			MainData,
			WorksPlacesModal,
			AdditionalData
		},
		setup() {
			const $store = useStore();

			onBeforeMount(() => {
				let slLS = localStorage.getItem('selectedLang');
				$store.dispatch('setLang', slLS || DefaultLang);
			})

			const setLang = e => $store.dispatch('setLang', e);
			const dataIsReady = computed(() => $store.getters.dataIsReady);
			const thx = computed(() => $store.getters.thx);

			return {
				setLang,
				dataIsReady,
				thx
			}
		}
	})
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    .container {
        margin: 0 auto;
        width: 1200px;
        padding: 0px 16px;
        max-width: calc(100% - 32px);

        .thx {
            justify-content: center;
            padding: 0px 20px 24px;
        }
    }

    @media (max-width: 599px) {
        .container {
            padding: 0px;
        }
    }
</style>
