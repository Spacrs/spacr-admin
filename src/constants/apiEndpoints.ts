const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VERSION = "v2";


const API = {
  USER: {
    LOGIN: `${BASE_URL}/api/${VERSION}/user/login`,
    REGISTER: `${BASE_URL}/api/${VERSION}/user/register`,
    ADD_EXTERNAL_USER_WITH_REFERRAL_CODE: `${BASE_URL}/api/${VERSION}/user/add-external-user-with-referral-code`,
  },

  ORDER: {
    CREATE_ORDER: `${BASE_URL}/api/${VERSION}/order/create`,
    TRENDING_PRODUCTS: `${BASE_URL}/api/${VERSION}/order/get-trending-products-on-website`,
    GET_SCRAPING_ICONS: `${BASE_URL}/api/${VERSION}/order/get-scraping-icons`,
    GET_ALL_MARKETPLACE_LIST: `${BASE_URL}/api/v5/order/get-all-marketplace-list`,
  },

  ADMIN: {
    ADD_BANNER: `${BASE_URL}/api/${VERSION}/admin/add-banner`,
    CHECK_GLOBAL_BANNER: `${BASE_URL}/api/${VERSION}/admin/check-global-banner`,
    DELETE_MARKETPLACE: `${BASE_URL}/api/${VERSION}/admin/delete-marketplace`, // + /{iconID}
    TOGGLE_BANNER_STATUS: `${BASE_URL}/api/${VERSION}/admin/toggle-banner-status`,
    GET_BANNER: `${BASE_URL}/api/${VERSION}/admin/get-banner`, // + /{bannerID}
    UPDATE_BANNER: `${BASE_URL}/api/${VERSION}/admin/update-banner`, // + /{bannerID}

    DELETE_ORDER_FROM_ADMIN: `${BASE_URL}/api/${VERSION}/admin/delete-order-from-admin`, // + /{orderID}

    REORDER_SUGGESTED_PRODUCTS: `${BASE_URL}/api/${VERSION}/admin/reorder-suggested-products`,

    ADD_SCRAPING_ICON: `${BASE_URL}/api/${VERSION}/admin/add-scraping-icon`,
    GET_SCRAPING_ICON: `${BASE_URL}/api/${VERSION}/admin/get-scraping-icon`, // + /{Id}
    EDIT_SCRAPING_ICON: `${BASE_URL}/api/${VERSION}/admin/edit-scraping-icon`, // + /{Id}

    CREATE_REFERRAL_CODE: `${BASE_URL}/api/${VERSION}/admin/create-referral-code`,
    TOGGLE_REFERRAL_CODE_STATUS: `${BASE_URL}/api/${VERSION}/admin/toggle-referral-code-status`,
    GET_REFERRAL_CODE_DETAILS: `${BASE_URL}/api/${VERSION}/admin/get-referral-code-details`, // + /{code}

    // added on 03-04-2026(RP)
    REPORTS: `${BASE_URL}/api/v5/admin/reports`,
    EXPORT_USERS: `${BASE_URL}/api/v5/admin/export-users`,
    EXPORT_TRIPS: `${BASE_URL}/api/v5/admin/export-trips`,
    EXPORT_ORDERS: `${BASE_URL}/api/v5/admin/export-orders`,
  },

  COUNTRY: {
    GET_COUNTRIES_FOR_BANNER: `${BASE_URL}/api/${VERSION}/country/get-countries-for-banner`,
    GET_COUNTRIES_FOR_BANNER_IN_EDIT: `${BASE_URL}/api/${VERSION}/country/get-countries-for-banner-in-edit`,
    GET_USERS_COUNTRIES: `${BASE_URL}/api/${VERSION}/country/get-users-countries`,
    DELETE_COUNTRY: `${BASE_URL}/api/${VERSION}/country/delete`, // + /{Id}
    GET_ALL_COUNTRIES: `${BASE_URL}/api/${VERSION}/country`,
  },

  CITY: {
    GET_COUNTRY_CITY: `${BASE_URL}/api/${VERSION}/country-city`,
    GET_CITY: `${BASE_URL}/api/${VERSION}/city`, // + /{Id}
  },

  NOTIFICATION: {
    GET_NOTIFICATION: `${BASE_URL}/api/${VERSION}/notification/get-a-notification`, // + /{notificationId}
    UPDATE_SCHEDULED_NOTIFICATION: `${BASE_URL}/api/${VERSION}/notification/update-scheduled-notification`, // + /{notificationId}
  },
};

export default API;