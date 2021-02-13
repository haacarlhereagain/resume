import {createStore} from 'vuex'
import {DefaultLang, YearWord} from "../const";
import getAge from "../additional/GetAge";
import axios from 'axios';

const state = {
	selectedLang: undefined,
	data: {},
	dataIsReady: false
}

const getters = {
	selectedLang: state => state.selectedLang,
	checkLangInData: state => payload => state.data[payload],
	mainData: state => state.data[state.selectedLang].mainData,
	skillz: state => state.data[state.selectedLang].skillz,
	aboutMe: state => state.data[state.selectedLang].aboutMe,
	thx: state => state.data[state.selectedLang].thx,
	worksPlacesButton: state => state.data[state.selectedLang].worksPlacesButton,
	modalWorksPlaces: state => state.data[state.selectedLang].modalWorksPlaces,
	data: state => state.data,
	dataIsReady: state => state.selectedLang !== undefined,
}


const mutations = {
	setLang: (state, payload) => {
		state.selectedLang = payload;
		localStorage.setItem('selectedLang', payload);
	},
	addData: (state, {lang, data}) => state.data[lang] = data,
}

const actions = {
	setLang: ({commit, dispatch, getters}, payload) => {
		if (!getters.checkLangInData(payload)) {
			dispatch('getData', payload)
				.then(() => {
					commit('setLang', getters.data[payload] ? payload : DefaultLang);
				})
				.catch(e => {
					dispatch('setLang', DefaultLang);
				})
		} else {
			commit('setLang', payload);
		}
	},
	getData: ({commit, getters, dispatch}, payload) => {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: `./langs/${payload}.json`
			})
				.then(async response => {
					let age = getAge(payload);
					let _ = JSON.parse(JSON.stringify(response.data));
					_.aboutMe.values[0] = response.data.aboutMe.values[0].replace(YearWord, age)
					commit('addData', {lang: payload, data: _});
					resolve();
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
