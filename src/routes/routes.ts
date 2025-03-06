import Dashboard from "../pages/DashboardManagement/Dashboard";
import Authenticate from "../pages/AuthManagement/Authenticate";
import PaymentConfig from "../pages/PaymentConfigManagement/PaymentConfig";

import Setting from "../pages/SettingManagemnt/Setting";
import Users from "../pages/UserManagemnt/Users";
import UserDetails from "../pages/UserManagemnt/UserDetails";

import AdminLayout from "../pages/AdminManagement/AdminLayout";
import Orders from "../pages/OrderManagement/Orders";
import OrderDetails from '../pages/OrderManagement/OrderDetails';
import DirectNotification from "../pages/NotificationManagement/DirectNotification";
import ScheduleNotification from "../pages/NotificationManagement/ScheduleNotification";

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
    path: "payment-config",
    component: PaymentConfig,
    breadcrumb: ["admin", "Payment Config"],
    showBreadcrumb: true,
  },
  {
    path: "order-list",
    component: Orders,
    breadcrumb: ["admin", "orders"],
    showBreadcrumb: true,
  },
  {
    path: "send-notification",
    component: DirectNotification,
    breadcrumb: ["admin", "Send Notification"],
    showBreadcrumb: true,
  },
  {
    path: "schedule-notification",
    component: ScheduleNotification,
    breadcrumb: ["admin", "Schedule Notification"],
    showBreadcrumb: true,
  },
  {
    path: "settings",
    component: Setting,
    breadcrumb: ["admin", "settings"],
    showBreadcrumb: true,
  },
  {
    path: "order-details/:order-id",
    component: OrderDetails,
    breadcrumb: ["admin", "Order-Details"],
    showBreadcrumb: true,
  }
];
