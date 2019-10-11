import Vue from 'vue';
import moment from 'moment';

const URL = {
	base: null,
	asset: null
};

if (document.querySelector('input[id="SITE_URL"]')) {
	const SITE = document.body.querySelector('input[id="SITE_URL"]');
	if (SITE) URL.base = SITE.value;
}

if (document.querySelector('input[id="ASSETS_URL"]')) {
	const ASSET = document.body.querySelector('input[id="ASSETS_URL"]');
	if (ASSET) URL.asset = ASSET.value;
}

Vue.mixin({
	computed: {
		url: {
			get() {
				return this.$data.__URL__;
			}
		}
	},
	methods: {
		setProcess(variable, status) {
			if (typeof variable == 'object') {
				for (const key in variable) {
					if (variable.hasOwnProperty(key)) {
						this.$data.__PROCESS__[key] = variable[key];
					}
				}

				let ignore = Object.keys(variable);
				for (const key in this.$data.__PROCESS__) {
					if (this.$data.__PROCESS__.hasOwnProperty(key)) {
						if (ignore.indexOf(key) < 0) this.$data.__PROCESS__[key] = false;
					}
				}
			} else {
				switch (variable) {
					case '__TRUE__':
						for (const key in this.$data.__PROCESS__) {
							if (this.$data.__PROCESS__.hasOwnProperty(key))
								this.$data.__PROCESS__[key] = true;
						}
						break;
					case '__FALSE__':
						for (const key in this.$data.__PROCESS__) {
							if (this.$data.__PROCESS__.hasOwnProperty(key))
								this.$data.__PROCESS__[key] = false;
						}
						break;
					default:
						this.$data.__PROCESS__[variable] = status || true;
						for (const key in this.$data.__PROCESS__) {
							if (this.$data.__PROCESS__.hasOwnProperty(key)) {
								if (key != variable) this.$data.__PROCESS__[key] = false;
							}
						}
						break;
				}
			}
			return this;
		},
		is(variable) {
			return this.$data.__PROCESS__[variable] == true;
		},
		toObject(data) {
			return JSON.parse(JSON.stringify(data));
		}
	},
	data() {
		return {
			__URL__: URL,
			__PROCESS__: {
				create: false,
				creating: false,
				created: false,
				edit: false,
				editing: false,
				edited: false,
				error: false,
				sync: false,
				syncing: false,
				synced: false,
				saving: false,
				saved: false,
				delete: false,
				deleting: false,
				deleted: false
			}
		};
	}
});

export default Vue;
