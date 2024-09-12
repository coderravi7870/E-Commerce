import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: false,
    isloading: true,
    event: null,
    error: null,
    events:null,
    message: null,
    deleteSuccess:false
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        // create event of a shop
        eventCreateRequest: (state) => {
            state.isloading = true;
        },
        eventCreateSuccess: (state, action) => {
            state.isloading = false;
            state.event = action.payload;
            state.success = true;
        },
        eventCreateFail: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
            state.success = false;
        },

        // get all events of shop
        getAlleventsRequest: (state)=>{
            state.isloading = true;
        },
        getAlleventsSuccess: (state, action) => {
            state.isloading = false;
            state.events = action.payload;
            state.deleteSuccess = true;
        },
        getAlleventsFaild: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
            state.deleteSuccess = false;
        },

        // delete events of a shop
        deleteeventsRequest: (state) => {
            state.isloading = true;
        },
        deleteeventsSuccess: (state, action) => {
            state.isloading = false;
            state.message = action.payload;
        },
        deleteeventsFailure: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        },

        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const { eventCreateRequest, eventCreateSuccess, eventCreateFail, clearErrors,getAlleventsRequest ,getAlleventsSuccess,getAlleventsFaild,deleteeventsRequest,deleteeventsSuccess,deleteeventsFailure} = eventSlice.actions;
export default eventSlice.reducer;

