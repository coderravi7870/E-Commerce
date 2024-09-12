import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSeller: false,
    isloading: true,
    seller: null,
    error: null,
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        loadSellerRequest: (state) => {
            state.isloading = true;
        },
        loadSellerSuccess: (state, action) => {
            state.isSeller = true;
            state.isloading = false;
            state.seller = action.payload;
        },
        loadSellerFail: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
            state.isSeller = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const { loadSellerRequest, loadSellerSuccess, loadSellerFail, clearErrors } = sellerSlice.actions;
export default sellerSlice.reducer;

