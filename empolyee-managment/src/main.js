import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import "element-plus/dist/index.css"; // Import Element Plus styles
import VueGallery from "vue-gallery";

// Create Vue app instance
const appInstance = createApp(App);

// Use necessary plugins
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(VueGallery);

// Mount the app
appInstance.mount("#app");
