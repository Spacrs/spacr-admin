import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  paymentConfigs: any[];
  paymentConfig: {};
  city: any[];
  cities: {};
  cityOptions: any[];
  countryOptions: any[];
  country: any[];
  countries: {};
  isEditPaymentConfig: boolean;
  isEditCity: boolean,
}

const initialState: IState = {
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
    setPaymentConfigs: (state: IState, action: PayloadAction<any[]>) => {
      state.paymentConfigs = action.payload;
    },
    updatePaymentConfigInList: (state: IState, action: PayloadAction<any>) => {
      state.paymentConfigs = state.paymentConfigs.map((config) =>
        config.Id === action.payload.Id ? action.payload : config
      );
    },
    addPaymentConfigToList: (state: IState, action: PayloadAction<any>) => {
      state.paymentConfigs.push(action.payload);
    },
    setCities: (state: IState, action: PayloadAction<any[]>) => {
      state.cities = action.payload
        ? action.payload.map((city) =>
            city.Country && typeof city.Country === "object"
              ? { ...city, countryName: city.Country.name }
              : { ...city }
          )
        : [];
    },
    setCountries: (state: IState, action: PayloadAction<any[]>) => {
      state.countries = action.payload;
    },
    setCountryOptions: (state: IState, action: PayloadAction<any[]>) => {
      state.countryOptions =
        action.payload && action.payload.length
          ? action.payload.map((country) => ({
              label: country.name,
              value: country.Id,
            }))
          : [];
    },
    setIsEditCountry: (
      state: IState,
      action: PayloadAction<{ isEditPaymentConfig?: boolean }>
    ) => {
      if (action.payload.isEditPaymentConfig !== undefined) {
        state.isEditPaymentConfig = action.payload.isEditPaymentConfig;
      }
    },
    setIsEditCity: (
      state: IState,
      action: PayloadAction<{ isEditCity?: boolean }>
    ) => {
      if (action.payload.isEditCity !== undefined) {
        state.isEditCity = action.payload.isEditCity;
      }
    },
  },
});

export const {
  setPaymentConfigs,
  updatePaymentConfigInList,
  addPaymentConfigToList,
  setCities,
  setCountries,
  setCountryOptions,
  setIsEditCountry,
  setIsEditCity,
} = paymentConfigSlice.actions;
export const selectPaymentConfig = (state: RootState) =>
  state.paymentConfigSlice.paymentConfigs;
export const selectCities = (state: RootState) =>
  state.paymentConfigSlice.cities;
export const selectCountries = (state: RootState) =>
  state.paymentConfigSlice.countries;
export const selectCounyOptions = (state: RootState) =>
  state.paymentConfigSlice.countryOptions;
export const selectCityOptions = (state: RootState) =>
  state.paymentConfigSlice.cityOptions;
export const selectIsEditPaymentConfig = (state: RootState) =>
  state.paymentConfigSlice.isEditPaymentConfig;
export const selectIsEditCity = (state: RootState) =>
  state.paymentConfigSlice.isEditCity;
export default paymentConfigSlice.reducer;
