import { createApp } from "vue";
import App from "./App.vue";
import router, { pinia } from "./router";

import "./index.css";
import "./assets/fonts.css";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
