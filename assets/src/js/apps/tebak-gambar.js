import BootstrapVue from 'bootstrap-vue';
import Vue from '../dependencies/vue';
import { storeTebakGambar } from '../stores/quiz';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

if (document.querySelector('#quiz-container')) {
	window.TebakGambar = new Vue({
		name: 'EngineTebakGambar',
		store: storeTebakGambar,
		el: '#quiz-container',
		components: {
			'quiz-layout': require('comps/tebak-gambar/Layout.vue')
		}
	});
}
