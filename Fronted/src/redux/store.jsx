import { configureStore } from "@reduxjs/toolkit";
import  {userReducer}  from "./slices/useSlices"; // Importing the userReducer from the user slice
import {sellerReducer} from "./slices/sellerSlices"
import {productReducer} from "./slices/productSlices"
import eventReducer from "./slices/eventSlices"
import { cartReducer } from "./slices/cart";
import { wishlistReducer } from "./slices/wishlist";
import {orderReducer} from "./slices/order";

const Store = configureStore({
    reducer: {
        user: userReducer, // Registering the user reducer under the "user" key in the store
        seller:sellerReducer,
        products: productReducer,
        events:eventReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer
    },
});

export default Store; // Exporting the configured store
