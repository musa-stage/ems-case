import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/styles/main.scss';
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Quasar);
app.use(PrimeVue);

app.mount("#app");
