import Dashboard from "../pages/DashboardManagement/Dashboard";
import Authenticate from "../pages/AuthManagement/Authenticate";
import PaymentConfig from "../pages/PaymentConfigManagement/PaymentConfig";

import Setting from "../pages/SettingManagemnt/Setting";
import Users from "../pages/UserManagemnt/Users";
import UserDetails from "../pages/UserManagemnt/UserDetails";

import AdminLayout from "../pages/AdminManagement/AdminLayout";
import Orders from "../pages/OrderManagement/Orders";
import OrderDetails from "../pages/OrderManagement/OrderDetails";
import DirectNotification from "../pages/NotificationManagement/DirectNotification";
import ScheduleNotification from "../pages/NotificationManagement/ScheduleNotification";
import ContactSupportList from "../pages/ContactSupportManagement/ContactSupportList";
import AddCountry from "../pages/PaymentConfigManagement/AddCountry";
import AddCity from "../pages/PaymentConfigManagement/AddCity";
import CityList from "../pages/PaymentConfigManagement/CityList";

import InputPage from "../pages/Samples/InputPage";
import Logout from "../pages/AuthManagement/Logout";
import SpacrConfig from "../pages/SpacrConfig/SpacrConfig";
import NotificationList from "../pages/NotificationManagement/NotificationList";
import AdminProducts from "../pages/OrderManagement/AdminProducts";
import OrderOffers from '../pages/OrderManagement/OrderOffers';
import SuggestedProductList from '../pages/SuggestedProductManagement/SuggestedProductList';
import AddSuggestedProduct from '../pages/SuggestedProductManagement/AddSuggestedProduct'

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
    breadcrumb: ["admin", "Payment Config Country List"],
    showBreadcrumb: true,
  },
  {
    path: "order-list",
    component: Orders,
    breadcrumb: ["admin", "orders"],
    showBreadcrumb: true,
  },
  {
    path: "product-list",
    component: AdminProducts,
    breadcrumb: ["admin", "products"],
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
    path: "notification-list",
    component: NotificationList,
    breadcrumb: ["admin", "Notification List"],
    showBreadcrumb: true,
  },
  {
    path: "contact-support-list",
    component: ContactSupportList,
    breadcrumb: ["admin", "Contact Support"],
    showBreadcrumb: true,
  },
  {
    path: "logout",
    component: Logout,
    breadcrumb: [],
    showBreadcrumb: false,
  },
  {
    path: "settings",
    component: Setting,
    breadcrumb: ["admin", "settings"],
    showBreadcrumb: true,
  },
  {
    path: "order-details/:orderId",
    component: OrderDetails,
    breadcrumb: ["admin", "Order-Details"],
    showBreadcrumb: true,
  },
  {
    path: "order-offers/:orderId",
    component: OrderOffers,
    breadcrumb: ["admin", "Order-Offers"],
    showBreadcrumb: true,
  },

  {
    path: "add-payment-config-country",
    component: AddCountry,
    breadcrumb: ["admin", "Add Country"],
    showBreadcrumb: true,
  },
  {
    path: "add-city",
    component: AddCity,
    breadcrumb: ["admin", "Add City"],
    showBreadcrumb: true,
  },
  {
    path: "city-list",
    component: CityList,
    breadcrumb: ["admin", "City List"],
    showBreadcrumb: true,
  },
  {
    path: "spacr-config",
    component: SpacrConfig,
    breadcrumb: ["admin", "Spacr Config"],
    showBreadcrumb: true,
  },
  {
    path: "suggested-product-list",
    component: SuggestedProductList,
    breadcrumb: ["admin", "Suggested Products"],
    showBreadcrumb: true,
  },
  {
    path: "add-suggested-product",
    component: AddSuggestedProduct,
    breadcrumb: ["admin", "Add Suggested Product"],
    showBreadcrumb: true,
  },
];
