import axios from "@/utils/axios";
export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async login(_, { email, password }) {
      const apiUrl = process.env.VUE_APP_API_URL;

      try {
        const { data } = await axios.post(`${apiUrl}/api/Auth/login`, {
          email,
          password,
        });
        return data;
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    },
    async signup(_, { username, email, password, role }) {
      const apiUrl = process.env.VUE_APP_API_URL;

      try {
        const { data } = await axios.post(`${apiUrl}/api/Auth/register`, {
          username,
          email,
          password,
          role,
        });
        return data;
      } catch (error) {
        console.error("Error signing up:", error);
        throw error;
      }
    },
  },
  getters: {
    // Define any getters you need here
  },
};
