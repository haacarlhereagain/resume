<template>
    <div class="lang-toggle">
        <span
            class="lang-toggle__button"
            v-for="(lang, index) in langs"
            :key="index"
            @click="setLang(lang)"
            :class="{ 'selected' : checkIsSelectingLang(lang) }"
        >{{ lang }}</span>
    </div>
</template>

<script>
import {defineComponent, computed, onBeforeMount} from 'vue'
	import {useStore} from 'vuex'
import {DefaultLang, langs} from "../const";

	export default defineComponent({
		setup() {

			const $store = useStore();

			const setLang = (e) => $store.dispatch('setLang', e);
			const currentLocale = computed(() => $store.getters.currentLocale);
			const checkIsSelectingLang = lang => currentLocale.value === lang;

      onBeforeMount(() => {
        let slLS = localStorage.getItem('selectedLang');
        $store.dispatch('setLang', slLS || DefaultLang);
      })

			return {
				langs,
				setLang,
        checkIsSelectingLang,
			}
		}
	})
</script>

<style lang="scss" scoped>
    .lang-toggle {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 40px;
        user-select: none;

        .lang-toggle__button {
            color: #ffffff4f;
            margin: 0px 5px;
            cursor: pointer;
            text-transform: uppercase;
            transition: 150ms;

            &:hover {
                color: #ffffff7d;
            }

            &.selected {
                color: #ffffffb1;
            }
        }
    }
</style>
