import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    orders: [],
    orderDetail: {},
    offers: [],
    offerDetail: {},
    products: [],
    productDetail: {},
    isEditProduct: false,
    isEditOrder: false,
};
export const orderSlice = createSlice({
    name: "ORDER_ACTIONS",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        updateOrderList: (state, action) => {
            state.orders = state.orders.map((order) => order.Id === action.payload.Id ? { ...order, ...action.payload } : order);
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        updateProductList: (state, action) => {
            const productToUpdate = state.products.find((product) => product.Id === action.payload.Id);
            if (productToUpdate) {
                state.products = state.products.map((product) => product.Id === action.payload.Id
                    ? { ...product, ...action.payload }
                    : product);
            }
            else {
                console.warn(`Product with Id ${action.payload.Id} not found.`);
            }
        },
        setOrderOffers: (state, action) => {
            console.log(action.payload, "action.payload");
            state.offers =
                Array.isArray(action.payload) && action.payload.length > 0
                    ? action.payload.map((list) => {
                        return {
                            ...list,
                            User: null,
                            userProfileImage: list.User.ProfilePictureURL,
                            offeredByName: list.User.FullName,
                            offeredByEmail: list.User.Email,
                            OfferedPrice: list.OfferedPrice || "0",
                        };
                    })
                    : [];
        },
        setIsEdit: (state, action) => {
            if (action.payload.isEditProduct !== undefined) {
                state.isEditProduct = action.payload.isEditProduct;
            }
            if (action.payload.isEditOrder !== undefined) {
                state.isEditOrder = action.payload.isEditOrder;
            }
        },
    },
});
export const { setOrders, updateOrderList, setProducts, updateProductList, setOrderOffers, setIsEdit, } = orderSlice.actions;
export const selectOrders = (state) => state.orderSlice.orders;
export const selectIsEditProduct = (state) => state.orderSlice.isEditProduct;
export const selectIsEditOrder = (state) => state.orderSlice.isEditOrder;
export default orderSlice.reducer;
