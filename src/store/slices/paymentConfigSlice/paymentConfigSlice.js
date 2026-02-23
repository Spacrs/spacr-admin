import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    paymentConfigs: [],
    paymentConfig: {},
    city: [],
    cities: {},
    country: [],
    countries: {},
    cityOptions: [],
    countryOptions: [],
    isEditPaymentConfig: false,
    isEditCity: false,
};
export const paymentConfigSlice = createSlice({
    name: "PAYMENT_CONFIG_ACTIONS",
    initialState,
    reducers: {
        setPaymentConfigs: (state, action) => {
            state.paymentConfigs = action.payload;
        },
        updatePaymentConfigInList: (state, action) => {
            state.paymentConfigs = state.paymentConfigs.map((config) => config.Id === action.payload.Id ? action.payload : config);
        },
        addPaymentConfigToList: (state, action) => {
            state.paymentConfigs.push(action.payload);
        },
        setCities: (state, action) => {
            state.cities = action.payload
                ? action.payload.map((city) => city.Country && typeof city.Country === "object"
                    ? { ...city, countryName: city.Country.name }
                    : { ...city })
                : [];
        },
        setCountries: (state, action) => {
            state.countries = action.payload;
        },
        setCountryOptions: (state, action) => {
            state.countryOptions =
                action.payload && action.payload.length
                    ? action.payload.map((country) => ({
                        label: country.name,
                        value: country.Id,
                    }))
                    : [];
        },
        setIsEditCountry: (state, action) => {
            if (action.payload.isEditPaymentConfig !== undefined) {
                state.isEditPaymentConfig = action.payload.isEditPaymentConfig;
            }
        },
        setIsEditCity: (state, action) => {
            if (action.payload.isEditCity !== undefined) {
                state.isEditCity = action.payload.isEditCity;
            }
        },
    },
});
export const { setPaymentConfigs, updatePaymentConfigInList, addPaymentConfigToList, setCities, setCountries, setCountryOptions, setIsEditCountry, setIsEditCity, } = paymentConfigSlice.actions;
export const selectPaymentConfig = (state) => state.paymentConfigSlice.paymentConfigs;
export const selectCities = (state) => state.paymentConfigSlice.cities;
export const selectCountries = (state) => state.paymentConfigSlice.countries;
export const selectCounyOptions = (state) => state.paymentConfigSlice.countryOptions;
export const selectCityOptions = (state) => state.paymentConfigSlice.cityOptions;
export const selectIsEditPaymentConfig = (state) => state.paymentConfigSlice.isEditPaymentConfig;
export const selectIsEditCity = (state) => state.paymentConfigSlice.isEditCity;
export default paymentConfigSlice.reducer;
