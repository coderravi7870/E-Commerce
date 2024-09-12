import axios from "axios";
import { server } from "../../server";
import { loadUserRequest, loadUserSuccess, loadUserFail } from "../slices/useSlices"; // Import the actions
import {loadSellerRequest,loadSellerSuccess,loadSellerFail} from "../slices/sellerSlices";

// load user
export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest()); // Dispatch the loadUserRequest action

        const { data } = await axios.get(`${server}/user/getuser`, { withCredentials: true });
        // console.log("userdata",data.result);
        
        dispatch(loadUserSuccess(data?.result)); // Dispatch the loadUserSuccess action with the payload
    } catch (error) {
        dispatch(loadUserFail(error.response.data)); // Dispatch the loadUserFail action with the payload
    }
};

// load seller
export const loadSeller = async (dispatch) => {
    try {
        dispatch(loadSellerRequest()); // Dispatch the loadUserRequest action

        const { data } = await axios.get(`${server}/shop/getseller`, { withCredentials: true });
        // console.log("sellerdata",data.result);
        
        dispatch(loadSellerSuccess(data?.result)); // Dispatch the loadUserSuccess action with the payload
    } catch (error) {
        dispatch(loadSellerFail(error.response.data)); // Dispatch the loadUserFail action with the payload
    }
};
