import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const { loadUserRequest, loadUserSuccess, loadUserFail, clearErrors } = userSlice.actions;
export default userSlice.reducer;

