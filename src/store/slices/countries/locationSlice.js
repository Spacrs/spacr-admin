import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
        setCountryCityData(state, action) {
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
            }, {});
        },
        setSelectedCountry(state, action) {
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
        setSelectedFromCountry(state, action) {
            const countryId = action.payload;
            state.selectedFromCountryId = countryId;
            state.fromCityOptions = state.cityOptionsMap[countryId] || [];
        },
        setSelectedToCountry(state, action) {
            const countryId = action.payload;
            state.selectedToCountryId = countryId;
            state.toCityOptions = state.cityOptionsMap[countryId] || [];
        },
        clearSelection(state) {
            state.selectedFromCountryId = null;
            state.selectedToCountryId = null;
            state.fromCityOptions = [];
            state.toCityOptions = [];
        },
    },
});
export const { setCountryCityData, setSelectedFromCountry, setSelectedToCountry, setSelectedCountry, clearSelection, } = locationSlice.actions;
// selectors for your components
export const selectCountryOptions = (state) => state.locationSlice.countryOptions;
export const selectFromCityOptions = (state) => state.locationSlice.fromCityOptions;
export const selectToCityOptions = (state) => state.locationSlice.toCityOptions;
export default locationSlice.reducer;
