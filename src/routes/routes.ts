import Dashboard from "../pages/DashboardManagement/Dashboard";
import Authenticate from "../pages/AuthManagement/Authenticate";
import Report from "../pages/Report";
import Setting from "../pages/SettingManagemnt/Setting";
import Users from "../pages/UserManagemnt/Users";
import UserDetails from "../pages/UserManagemnt/UserDetails";

import Categories from "../pages/CategoryManagement/Categories";
import AdminLayout from "../pages/AdminManagement/AdminLayout";

export const protectedRoutes = [
  // these routes are accessable with auth or layout for diffrent roles
  {
    path: "/admin/*",
    component: AdminLayout,
  },
];

export const authRoutes = [
  // these routes are accessable without auth but not accessable with auth
  {
    path: "/",
    component: Authenticate,
  },
];

export const adminRoutes = [
  // these routes are accessable with auth or child routes of admin/*  routes
  {
    path: "dashboard",
    component: Dashboard,
    breadcrumb: ["admin", "dashboard"],
    showBreadcrumb: true,
  },
  {
    path: "users",
    component: Users,
    breadcrumb: ["admin", "users"],
    showBreadcrumb: true,
  },
  {
    path: "users-details/:id",
    component: UserDetails,
    breadcrumb: ["admin", "User-Details"],
    showBreadcrumb: true,
  },
  {
    path: "reports",
    component: Report,
    breadcrumb: ["admin", "reports"],
    showBreadcrumb: true,
  },
  {
    path: "settings",
    component: Setting,
    breadcrumb: ["admin", "settings"],
    showBreadcrumb: true,
  },
  // {
  //   path: "templates",
  //   component: Template,
  //   breadcrumb: ["admin", "templates"],
  //   showBreadcrumb: true,
  // },
  // {
  //   path: "/create/template/:categoryId",
  //   component: ConfigureTemplate,
  //   breadcrumb: ["admin", "Create Templates"],
  //   showBreadcrumb: false,
  // },
  // {
  //   path: "/edit/template/:categoryId/:templateId",
  //   component: ConfigureTemplate,
  //   breadcrumb: ["admin", "Create Templates"],
  //   showBreadcrumb: false,
  // },
  {
    path: "/template-category",
    component: Categories,
    breadcrumb: ["admin", "Template Categories"],
    showBreadcrumb: true,
  },
];
