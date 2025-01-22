import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import EmployeeDetails from "./views/EmployeeDetails.vue";
import NotFound from "./views/NotFound.vue";
import EmployeeListPage from "./views/EmployeeListPage.vue";
import DepartmentsPage from "./views/DepartmentsPage.vue";
import SettingsPage from "./views/SettingsPage.vue";
import DepartmentDetails from "./views/DepartmentDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/employees",
    name: "EmployeeList",
    component: EmployeeListPage,
  },
  {
    path: "/departments",
    name: "Departments",
    component: DepartmentsPage,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsPage,
  },
  {
    path: "/employees/:id",
    name: "EmployeeDetails",
    component: EmployeeDetails,
  },
  {
    path: "/departments/:departmentName",
    name: "DepartmentDetails",
    component: DepartmentDetails,
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
