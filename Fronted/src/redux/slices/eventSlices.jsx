import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: false,
    isloading: true,
    event: null,
    error: null,
    events:null,
    message: null,
    deleteSuccess:false,
    allEvents:null,
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
        getAlleventsShopRequest: (state)=>{
            state.isloading = true;
        },
        getAlleventsShopSuccess: (state, action) => {
            state.isloading = false;
            state.events = action.payload;
        },
        getAlleventsShopFaild: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        },

        // delete events of a shop
        deleteeventsRequest: (state) => {
            state.isloading = true;
        },
        deleteeventsSuccess: (state, action) => {
            state.isloading = false;
            state.message = action.payload;
            state.deleteSuccess = true;
        },
        deleteeventsFailure: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
            state.deleteSuccess = false;
        },

         // get all events 
         getAlleventsRequest: (state)=>{
            state.isloading = true;
        },
        getAlleventsSuccess: (state, action) => {
            state.isloading = false;
            state.allEvents = action.payload;
        },
        getAlleventsFaild: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        },

        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const { eventCreateRequest, eventCreateSuccess, eventCreateFail, clearErrors,getAlleventsShopRequest,getAlleventsShopSuccess,getAlleventsShopFaild,deleteeventsRequest,deleteeventsSuccess,deleteeventsFailure,getAlleventsRequest,getAlleventsSuccess,getAlleventsFaild} = eventSlice.actions;
export default eventSlice.reducer;

