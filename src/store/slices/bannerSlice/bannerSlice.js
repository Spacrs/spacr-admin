import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    banners: [],
    bannerDetail: {},
    isEditBanner: false,
};
export const bannerSlice = createSlice({
    name: "BANNER_ACTIONS",
    initialState,
    reducers: {
        setBanners: (state, action) => {
            state.banners = action.payload;
        },
        updateBannerList: (state, action) => {
            const index = state.banners.findIndex(b => b.Id === action.payload.Id);
            if (index !== -1) {
                state.banners[index] = { ...state.banners[index], ...action.payload };
            }
            else {
                console.warn(`Banner with Id ${action.payload.Id} not found.`);
            }
        },
        setBannerDetail: (state, action) => {
            state.bannerDetail = action.payload;
        },
        setIsEditBanner: (state, action) => {
            state.isEditBanner = action.payload;
        },
    },
});
export const { setBanners, updateBannerList, setBannerDetail, setIsEditBanner, } = bannerSlice.actions;
// Selectors
export const selectBanners = (state) => state.bannerSlice.banners;
export const selectIsEditBanner = (state) => state.bannerSlice.isEditBanner;
export const selectBannerDetail = (state) => state.bannerSlice.bannerDetail;
export default bannerSlice.reducer;
