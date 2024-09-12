import axios from "axios";
import { server } from "../../server";
import { deleteeventsFailure, deleteeventsRequest, deleteeventsSuccess, getAlleventsFaild, getAlleventsRequest, getAlleventsSuccess, eventCreateFail, eventCreateRequest, eventCreateSuccess } from "../slices/eventSlices";

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
        dispatch(getAlleventsRequest());
        
        
        const response = await axios.get(`${server}/event/get-all-events/${id}`);

        console.log("response: " + response.data.result);
        dispatch(getAlleventsSuccess(response.data.result));
    } catch (error) {
        dispatch(getAlleventsFaild(error.response.data.message));
    }
}

// delete events of a shop

export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch(deleteeventsRequest());
        console.log("delte",id);
        
        const response = await axios.delete(`${server}/event/delete-event/${id}`,{
            withCredentials: true,
        });
        console.log("response: " + response.data);
        dispatch(deleteeventsSuccess(response.data.message));
    } catch (error) {
        dispatch(deleteeventsFailure(error.response.data.message));
    }
}
