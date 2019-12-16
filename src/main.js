import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;

Vue.use(axios, VueAxios);

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
