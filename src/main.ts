import { createApp } from 'vue'
import App from './App.vue'
import ContextMenu from "./contextmenu/index";

const app = createApp(App);
app.use(ContextMenu, { type: "both" });
app.mount("#app");

