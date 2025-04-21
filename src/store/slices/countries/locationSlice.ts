import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface City {
  Id: number;
  name: string;
}
interface Country {
  Id: number;
  name: string;
  cities: City[];
}

interface Option {
  value: number;
  label: string;
}

interface LocationState {
  countries: Country[];
  countryOptions: Option[];
  cityOptionsMap: Record<number, Option[]>;
  selectedFromCountryId: number | null;
  fromCityOptions: Option[];
  selectedToCountryId: number | null;
  toCityOptions: Option[];
}

const initialState: LocationState = {
  countries: [],
  countryOptions: [],
  cityOptionsMap: {},
  selectedFromCountryId: null,
  selectedToCountryId: null,
  fromCityOptions: [],
  toCityOptions: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCountryCityData(state, action: PayloadAction<Country[]>) {
      const countries = action.payload;
      console.log(countries, "countries");

      state.countries = countries;
      state.countryOptions = countries.map((c) => ({
        value: c.Id,
        label: c.name,
      }));
      state.cityOptionsMap = countries.reduce((map, c) => {
        map[c.Id] = c.cities.map((city) => ({
          value: city.Id,
          label: city.name,
        }));
        return map;
      }, {} as Record<number, Option[]>);
    },
    setSelectedCountry(
      state,
      action: PayloadAction<{
        selectedFromCountryId?: number;
        selectedToCountryId?: number;
      }>
    ) {
      if (action.payload.selectedFromCountryId !== undefined) {
        state.selectedFromCountryId = action.payload.selectedFromCountryId;
        state.fromCityOptions =
          state.cityOptionsMap[action.payload.selectedFromCountryId] || [];
      }

      if (action.payload.selectedToCountryId !== undefined) {
        state.selectedToCountryId = action.payload.selectedToCountryId;
        state.toCityOptions =
          state.cityOptionsMap[action.payload.selectedToCountryId] || [];
      }
    },
    setSelectedFromCountry(state, action: PayloadAction<number>) {
      const countryId = action.payload;
      state.selectedFromCountryId = countryId;
      state.fromCityOptions = state.cityOptionsMap[countryId] || [];
    },
    setSelectedToCountry(state, action: PayloadAction<number>) {
      const countryId = action.payload;
      state.selectedToCountryId = countryId;
      state.toCityOptions = state.cityOptionsMap[countryId] || [];
    },
    clearSelection(state) {
      //   state.selectedCountryId = null;
      //   state.cityOptions = [];
    },
  },
});

export const {
  setCountryCityData,
  setSelectedFromCountry,
  setSelectedToCountry,
  setSelectedCountry,
  clearSelection,
} = locationSlice.actions;

// selectors for your components
export const selectCountryOptions = (state: RootState) =>
  state.locationSlice.countryOptions;

export const selectFromCityOptions = (state: RootState) =>
  state.locationSlice.fromCityOptions;
export const selectToCityOptions = (state: RootState) =>
  state.locationSlice.toCityOptions;

export default locationSlice.reducer;
