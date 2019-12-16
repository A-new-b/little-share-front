import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from "vuetify/es5/locale/zh-Hans";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader

Vue.use(Vuetify);


export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  },
  icons: {
    iconfont: "mdi"
  }
});
