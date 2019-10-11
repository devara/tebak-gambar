import Vue from '../dependencies/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const MODULE_TEBAK_GAMBAR = {
	state: {
		nama_kelompok: '',
		anggota_kelompok: '',
		tipe_soal: '',
		bobot_soal: 10,
		nilai: 0,
		record: {},
		total: 0,
		complete: 0,
		incomplete: 0,
		correct_answer: 0,
		wrong_answer: 0
	},
	mutations: {
		kelompok(state, payload) {
			state.nama_kelompok = payload;
		},
		anggota(state, payload) {
			state.anggota_kelompok = payload;
		},
		soal(state, payload) {
			state.tipe_soal = payload;
		},
		record(state, payload) {
			state.record = payload;
		},
		total(state, payload) {
			const RESULT = state.record;
			if (RESULT.status == true) {
				const DATA = RESULT.data.question_lists;
				state.total = DATA.length;
			}
		},
		answer(state, payload) {}
	},
	actions: {
		namaKelompok({ commit }, payload) {
			commit('kelompok', payload);
		},
		anggotaKelompok({ commit }, payload) {
			commit('anggota', payload);
		},
		tipeSoal({ commit }, payload) {
			commit('soal', payload);
		},
		record({ commit }, payload) {
			commit('record', payload);
		},
		total({ commit }, payload) {
			commit('total', payload);
		},
		answer({ commit }, payload) {
			commit('answer', payload);
		}
	},
	getters: {
		getQuestions: state => {
			const RESULT = state.record;
			if (RESULT.status == true) {
				const DATA = RESULT.data.question_lists;
				return DATA;
			}
			return [];
		}
	}
};

const storeTebakGambar = new Vuex.Store({
	modules: {
		tebakGambar: {
			namespaced: true,
			...MODULE_TEBAK_GAMBAR
		}
	}
});

export { storeTebakGambar };
