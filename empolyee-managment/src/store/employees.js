import axios from "@/utils/axios";

const state = {
  employeesData: [],
};

const actions = {
  async fetchEmployeesData({ commit }) {
    try {
      const apiUrl = process.env.VUE_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/employees`);
      commit("SET_EMPLOYEES_DATA", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees data:", error);
      throw error;
    }
  },
  async createEmployee({ commit }, employeeData) {
    try {
      const apiUrl = process.env.VUE_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/employees`,
        employeeData
      );
      commit("ADD_EMPLOYEE", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },
  async deleteEmployee(_, id) {
    try {
      const apiUrl = process.env.VUE_APP_API_URL;
      await axios.delete(`${apiUrl}/api/employees/${id}`);
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
  async fetchEmployeeById(_, id) {
    try {
      const apiUrl = process.env.VUE_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
      throw error;
    }
  },
  async updateEmployee(_, { id, data }) {
    try {
      const apiUrl = process.env.VUE_APP_API_URL;
      const response = await axios.put(`${apiUrl}/api/employees/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },
};

const mutations = {
  SET_EMPLOYEES_DATA(state, data) {
    state.employeesData = data;
  },
  ADD_EMPLOYEE(state, employee) {
    state.employeesData.push(employee);
  },
};

const getters = {
  getEmployeesData(state) {
    return state.employeesData;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
