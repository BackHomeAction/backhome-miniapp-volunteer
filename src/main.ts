import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { internalMixin } from "./utils/runtime";

const app = createApp(App);

internalMixin(app);

app.use(store).mount("#app");
