import { createApp } from "vue";
import App from "./App.vue";
import ContextMenu from "./components/contextmenu";

const app = createApp(App);
app.use(ContextMenu);
app.mount("#app");
