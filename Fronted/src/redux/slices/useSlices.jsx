// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   loading: true,
//   user: null,
//   error: null,
//   addressloading:false,
//   successMessage:null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loadUserRequest: (state) => {
//       state.loading = true;
//     },
//     loadUserSuccess: (state, action) => {
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.user = action.payload;
//     },
//     loadUserFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.isAuthenticated = false;
//     },

//     // update user information
//     updateUserInfoRequest: (state) => {
//       state.loading = true;
//     },
//     updateUserInfoSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     updateUserInfoFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // update user address
//     updateUserAddressRequest: (state) => {
//       state.addressloading = true;
//     },
//     updateUserAddressSuccess: (state, action) => {
//       console.log("user address",action.payload.user);  
//       console.log("successMessage",action.payload.successMessage);  
//       state.addressloading = false;
//       state.successMessage = action.payload.successMessage;
//       state.user = action.payload.user;
//     },
//     updateUserAddressFailed: (state, action) => {
//       state.addressloading = false;
//       state.error = action.payload;
//     },

//     // delete user address
//     // deleteUserAddressRequest: (state) => {
//     //   state.addressloading = true;
//     // },
//     // deleteUserAddressSuccess: (state, action) => {
//     //   state.addressloading = false;
//     //   state.successMessage = action.payload.successMessage;
//     //   state.user = action.payload.user;
//     // },
//     // deleteUserAddressFailed: (state, action) => {
//     //   state.addressloading = false;
//     //   state.error = action.payload;
//     // },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   loadUserRequest,
//   loadUserSuccess,
//   loadUserFail,
//   updateUserInfoRequest,
//   updateUserInfoSuccess,
//   updateUserInfoFailed,
//   updateUserAddressRequest,
//   updateUserAddressSuccess,
//   updateUserAddressFailed,
//   deleteUserAddressRequest,
//   deleteUserAddressSuccess,
//   deleteUserAddressFailed,
//   clearErrors,
// } = userSlice.actions;
// export default userSlice.reducer;


import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  // loading: false,
  // user: null,
  // error: null,
  // addressloading: false,
  // successMessage: null
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
      // console.log(action.payload);
      
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('LoadUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    //update user information
    .addCase('updateUserInfoRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateUserInfoSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('updateUserInfoFailed', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //update user address 
    .addCase('updateUserAddressRequest', (state) =>{
      state.addressloading = true;
    })
    .addCase('updateUserAddressSuccess', (state, action) => {
      // console.log(action.payload.user)
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase('updateUserAddressFailed', (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    //delete user address
    .addCase('deleteUserAddressRequest', (state) =>{
      state.addressloading = true;
    })
    .addCase('deleteUserAddressSuccess', (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase('deleteUserAddressFailed', (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    .addCase('clearErrors', (state) =>{
      state.error = null;
    })
    .addCase('clearMessages', (state) =>{
      state.successMessage = null;
    });
});
