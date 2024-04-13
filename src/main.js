import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import { useUserStore } from './store/user';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

const pinia = createPinia();
const app = createApp(App);


app.use(pinia);
app.use(router);
const store = useUserStore();
app.use(store);

app.mount('#app');