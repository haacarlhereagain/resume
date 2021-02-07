import {createStore} from 'vuex'
import {DefaultLang, YearWord, Langs} from "../const";
import getAge from "../additional/GetAge";
import axios from 'axios';

const state = {
	selectedLang: 'ru',
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
	dataIsReady: state => state.dataIsReady
}


const mutations = {
	setLang: (state, payload) => {
		state.selectedLang = payload;
		localStorage.setItem('selectedLang', payload);
	},
	addData: (state, {lang, data}) => state.data[lang] = data,
	setDataIsReady: state => state.dataIsReady = true
}

const actions = {
	setLang: ({commit, dispatch, getters}, payload) => {
		if (!getters.checkLangInData(payload)) {
			dispatch('getData', payload)
				.then(() => {
					commit('setLang', getters.data[payload] ? payload : DefaultLang);
					commit('setDataIsReady');
				})
		} else {
			commit('setLang', payload);
		}
	},
	getData: ({commit, getters}, payload) => {
		return new Promise(resolve => {
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
				.catch(e => {
					resolve();
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
