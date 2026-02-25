import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import { BannerData } from "../../../types/BannerData.types";

interface BannerState {
  banners: BannerData[];
  bannerDetail: BannerData | {};
  isEditBanner: boolean;
}

const initialState: BannerState = {
  banners: [],
  bannerDetail: {},
  isEditBanner: false,
};

export const bannerSlice = createSlice({
  name: "BANNER_ACTIONS",
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<BannerData[]>) => {
      state.banners = action.payload;
    },
    updateBannerList: (state, action: PayloadAction<BannerData>) => {
      const index = state.banners.findIndex(b => b.Id === action.payload.Id);
      if (index !== -1) {
        state.banners[index] = { ...state.banners[index], ...action.payload };
      } else {
        console.warn(`Banner with Id ${action.payload.Id} not found.`);
      }
    },
    setBannerDetail: (state, action: PayloadAction<BannerData>) => {
      state.bannerDetail = action.payload;
    },
    setIsEditBanner: (state, action: PayloadAction<boolean>) => {
      state.isEditBanner = action.payload;
    },
  },
});

export const {
  setBanners,
  updateBannerList,
  setBannerDetail,
  setIsEditBanner,
} = bannerSlice.actions;

// Selectors
export const selectBanners = (state: RootState) => state.bannerSlice.banners;
export const selectIsEditBanner = (state: RootState) => state.bannerSlice.isEditBanner;
export const selectBannerDetail = (state: RootState) => state.bannerSlice.bannerDetail;

export default bannerSlice.reducer;
