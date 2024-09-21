import axios from "axios";
import { server } from "../../server";



// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    
    
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    // console.log("userdata",data.result);

    dispatch({
      type: "LoadUserSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "loadSellerRequest" });

    const { data } = await axios.get(`${server}/shop/getseller`, {
      withCredentials: true,
    });
    // console.log("sellerdata",data);
    if (data.success) {
      dispatch({
        type: "loadSellerSuccess",
        payload: data?.result,
      });
    } else {
      dispatch({
        type: "loadSellerFail",
        payload: data?.result.message,
      });
    }
  } catch (error) {
    dispatch({
      type: "loadSellerFail",
      payload: error.response.data,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest"
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        { name, email, phoneNumber, password },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Credentials": true },
        }
      );
      if (data?.success === 1) {
        dispatch({
          type: "updateUserInfoSuccess",
          payload: data?.result
        });
      } else {
        // console.log("data", data?.message);
        dispatch({
          type: "updateUserInfoFailed",
          payload: data?.message
        });
      }
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message
      });
    }
  };

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );
      // console.log("data: " + JSON.stringify(data.user, null, 2));
      if (data.success) {
          dispatch({
            type: "updateUserAddressSuccess",
            payload: {
              successMessage: "User address updated successfully",
              user: data.user
            },
          });
    
      } else {
        dispatch({
          type: "updateUserAddressFailed",
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });

    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-addres/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};
