let axios = require('axios');

let apiUrl = document.head.querySelector('meta[name="api-service-url"]');
if (apiUrl) axios.defaults.baseURL = apiUrl.content;
axios.defaults.headers.common.Accept = 'application/json, text/plain';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = apiUrl.content;

module.exports = axios;
