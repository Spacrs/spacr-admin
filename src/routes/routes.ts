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
import AddAndEditCountry from "../pages/PaymentConfigManagement/AddAndEditCountry";
import AddAndEditCity from "../pages/PaymentConfigManagement/AddAndEditCity";
import CityList from "../pages/PaymentConfigManagement/CityList";

// import InputPage from "../pages/Samples/InputPage";
import Logout from "../pages/AuthManagement/Logout";
import SpacrConfig from "../pages/SpacrConfig/SpacrConfig";
import NotificationList from "../pages/NotificationManagement/NotificationList";
import AdminProducts from "../pages/OrderManagement/AdminProducts";
import AddSuggestedProduct from "../pages/OrderManagement/AddSuggestedProduct";
import OrderOffers from "../pages/OrderManagement/OrderOffers";
import RearrangeAdminProducts from "../pages/OrderManagement/RearrangeAdminProducts";
import ScrapLogoList from "../pages/ScrapManagement/ScrapLogoList";
import AddScrapingIcon from "../pages/ScrapManagement/AddScrapingIcon";
import ReferralCodeList from "../pages/ReferralCodeManagement/ReferralCodeList";
import AddReferralCode from "../pages/ReferralCodeManagement/AddReferralCode";
import ReferralCodeDetails from "../pages/ReferralCodeManagement/ReferralCodeDetails";
import EditReferralCode from "../pages/ReferralCodeManagement/EditReferralCode";
import ExternalPage from "../pages/ExternalPage/ExternalPage";
import TravelListing from "../pages/TravelListingManagement/TravelListing";
import NotificationView from "../pages/NotificationManagement/NotificationView";
import EditScheduleNotification from "../pages/NotificationManagement/EditScheduleNotification";

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
  {
    path: "/assign-referral-code",
    component: ExternalPage,
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
    path: "suggested-product-list",
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
    breadcrumb: ["admin", "Order Details"],
    showBreadcrumb: true,
  },
  {
    path: "product-details/:orderId",
    component: OrderDetails,
    breadcrumb: ["admin", "Product Details"],
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
    component: AddAndEditCountry,
    breadcrumb: ["admin", "Add Country"],
    showBreadcrumb: true,
  },
  {
    path: "edit-payment-config-country/:countryId",
    component: AddAndEditCountry,
    breadcrumb: ["admin", "Edit Country"],
    showBreadcrumb: true,
  },
  {
    path: "add-city",
    component: AddAndEditCity,
    breadcrumb: ["admin", "Add City"],
    showBreadcrumb: true,
  },
  {
    path: "edit-city/:cityId",
    component: AddAndEditCity,
    breadcrumb: ["admin", "Edit City"],
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
    path: "add-suggested-product",
    component: AddSuggestedProduct,
    breadcrumb: ["admin", "Add Suggested Product"],
    showBreadcrumb: true,
  },
  {
    path: "edit-suggested-product/:productId",
    component: AddSuggestedProduct,
    breadcrumb: ["admin", "Edit Suggested Product"],
    showBreadcrumb: true,
  },
  {
    path: "rearrage-suggested-product-list",
    component: RearrangeAdminProducts,
    breadcrumb: ["admin", "Rearrange Products"],
    showBreadcrumb: true,
  },
  {
    path: "scrap-logo-list",
    component: ScrapLogoList,
    breadcrumb: ["admin", "Scraping Applications Logos"],
    showBreadcrumb: true,
  },
  {
    path: "add-scraping-icon",
    component: AddScrapingIcon,
    breadcrumb: ["admin", "Add Scraping Icon"],
    showBreadcrumb: true,
  },
  {
    path: "referral-code-list",
    component: ReferralCodeList,
    breadcrumb: ["admin", "Referral Code List"],
    showBreadcrumb: true,
  },
  {
    path: "add-referral-code",
    component: AddReferralCode,
    breadcrumb: ["admin", "Add Referral Code"],
    showBreadcrumb: true,
  },
  {
    path: "referral-code-details/:referralCodeID",
    component: ReferralCodeDetails,
    breadcrumb: ["admin", "Referral Code Details"],
    showBreadcrumb: true,
  },
  {
    path: "edit-referral-code/:referralCodeID",
    component: EditReferralCode,
    breadcrumb: ["admin", "Edit Referral Code"],
    showBreadcrumb: true,
  },
  //TravelListing
  {
    path: "travel-listing",
    component: TravelListing,
    breadcrumb: ["admin", "Travel Listing"],
    showBreadcrumb: true,
  },
  {
    path: "view-notification/:notificationId",
    component: NotificationView,
    breadcrumb: ["admin", "Notification Details"],
    showBreadcrumb: true,
  },
  {
    path: "edit-schedule-notification/:notificationId",
    component: EditScheduleNotification,
    breadcrumb: ["admin", "Edit Scheduled Notification"],
    showBreadcrumb: true,
  },
  
];
