// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     success: false,
//     isloading: true,
//     product: null,
//     error: null,
//     products:null,
//     message: null,
//     deleteSuccess:false
// };

// const productSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         // create product of a shop
//         productCreateRequest: (state) => {
//             state.isloading = true;
//         },
//         productCreateSuccess: (state, action) => {
//             state.isloading = false;
//             state.product = action.payload;
//             state.success = true;
//         },
//         productCreateFail: (state, action) => {
//             state.isloading = false;
//             state.error = action.payload;
//             state.success = false;
//         },

//         // get all products of shop
//         getAllProductsRequest: (state)=>{
//             state.isloading = true;
//         },
//         getAllProductsSuccess: (state, action) => {
//             state.isloading = false;
//             state.products = action.payload;
//             state.deleteSuccess = true;
//         },
//         getAllProductsFaild: (state, action) => {
//             state.isloading = false;
//             state.error = action.payload;
//             state.deleteSuccess = false;
//         },

//         // delete products of a shop
//         deleteProductsRequest: (state) => {
//             state.isloading = true;
//         },
//         deleteProductsSuccess: (state, action) => {
//             state.isloading = false;
//             state.message = action.payload;
//         },
//         deleteProductsFailure: (state, action) => {
//             state.isloading = false;
//             state.error = action.payload;
//         },

//         clearErrors: (state) => {
//             state.error = null;
//         },
//     },
// });

// export const { productCreateRequest, productCreateSuccess, productCreateFail, clearErrors,getAllProductsRequest ,getAllProductsSuccess,getAllProductsFaild,deleteProductsRequest,deleteProductsSuccess,deleteProductsFailure} = productSlice.actions;
// export default productSlice.reducer;

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isloading: true,
  // allproducts: null,
  // allProductsFetch:false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // Create product actions
    .addCase("productCreateRequest", (state) => {
      state.isloading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isloading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all products of shop actions
    .addCase("getAllProductsShopRequest", (state) => {
      state.isloading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isloading = false;
      state.products = action.payload;
      state.fetchSuccess = true;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.fetchSuccess = false;
    })

    // Delete product of shop actions
    .addCase("deleteProductRequest", (state) => {
      state.isloading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isloading = false;
      state.message = action.payload;
      state.deleteSuccess = true;
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    })

    // get all products
    .addCase("getAllProductsRequest", (state) => {
      state.isloading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isloading = false;
      state.allproducts = action.payload;
    })
    .addCase("getAllProductsFailed", (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    })

    // Clear errors action
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
