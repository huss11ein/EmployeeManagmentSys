// store/index.js
import { createStore } from "vuex";
import layout from "./layout";
import employees from "./employees";
import auth from "./auth";

export default createStore({
  modules: {
    layout, // Register the layout module
    employees, // Register the employees module
    auth, // Register the auth module
  },
});

