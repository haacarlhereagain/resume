import {createStore} from 'vuex'
import {DefaultLang, YearWord} from "../const";
import getAge from '../utils/GetAge';
import axios from 'axios';

const state = {
	localesData: {},
	currentLocale: undefined
}

const getters = {
	currentLocale: state => state.currentLocale,
	translateData: state => state.localesData[state.currentLocale],
}


const mutations = {
	setLocale: (state, payload) => {
		state.currentLocale = payload;
	},
	addLocale: (state, { locale, localeData }) => state.localesData[locale] = localeData,
}

const actions = {
	setLang: async ({commit, dispatch, getters}, locale) => {
		if (!(locale in state.localesData)) {
			const localeData = await dispatch('loadLocale', locale);
			commit('addLocale', { locale, localeData });
		}
		commit('setLocale', locale);
	},
	loadLocale: ({commit, getters, dispatch}, locale) => {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: `./langs/${locale}.json`
			})
				.then(async response => {
					let age = getAge(locale);
					let _ = JSON.parse(JSON.stringify(response.data));
					_.aboutMe.values[0] = response.data.aboutMe.values[0].replace(YearWord, age)
					resolve(_);
				})
				.catch(() => {
					reject();
				})
		})
	}
}

export default createStore({
	state,
	getters,
	mutations,
	actions
})
