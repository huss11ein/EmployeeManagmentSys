import { createRouter, createWebHistory } from "vue-router";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Dashboard from "../views/Dashboard.vue"; // Add this import
import empolyees from "../views/empolyees.vue"; // Add this import
import empolyeesCreate from "../views/empolyeesCreate.vue";
import empolyeesEdit from "../views/empolyeesEdit.vue"; // Add this import

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin", // Change this line to a string path
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    // redirect: "/signin",
  },
  {
    path: "/employees",
    name: "Employees",
    component: empolyees,
    meta: { requiresAuth: true },
    // redirect: "/signin",
  },
  {
    path: "/employee/create",
    name: "EmployeesCreate",
    component: empolyeesCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/employee/edit/:id",
    name: "EmployeesEdit",
    component: empolyeesEdit,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;

