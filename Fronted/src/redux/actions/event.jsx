import axios from "axios";
import { server } from "../../server";
import { deleteeventsFailure, deleteeventsRequest, deleteeventsSuccess, eventCreateFail, eventCreateRequest, eventCreateSuccess, getAlleventsFaild, getAlleventsRequest, getAlleventsShopFaild, getAlleventsShopRequest, getAlleventsShopSuccess, getAlleventsSuccess } from "../slices/eventSlices";

// create event 
export const createevent = (newForm)=> async (dispatch)=>{
    try {
        dispatch(eventCreateRequest());

        const config = {headers: {'Content-Type': 'multipart/form-data'}}

        const response = await axios.post(`${server}/event/create-event`,newForm,config);
        
        console.log("response: " + response);
        
        dispatch(eventCreateSuccess(response.data));
    } catch (error) {
        dispatch(eventCreateFail(error.response.data.message)); 
    }
};

// all events of a shop
export const getAlleventsShop = (id)=> async (dispatch) => {
    try {
        dispatch(getAlleventsShopRequest());
        
        
        const {data} = await axios.get(`${server}/event/get-all-events/${id}`);

        dispatch(getAlleventsShopSuccess(data.result));
    } catch (error) {
        dispatch(getAlleventsShopFaild(error.response.data.message));
    }
}

// delete events of a shop

export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch(deleteeventsRequest());
        // console.log("delte",id);
        
        const response = await axios.delete(`${server}/event/delete-event/${id}`,{
            withCredentials: true,
        });
        console.log("response: " + response.data);
        dispatch(deleteeventsSuccess(response.data.message));
    } catch (error) {
        dispatch(deleteeventsFailure(error.response.data.message));
    }
}

export const getAllEvents = ()=>async(dispatch) =>{
    try {
        dispatch(getAlleventsRequest());

        const {data} = await axios.get(`${server}/event/get-all-events`);
        
        
        dispatch(getAlleventsSuccess(data.result));
    } catch (error) {
        dispatch(getAlleventsFaild(error.response.data.message));
    }
}