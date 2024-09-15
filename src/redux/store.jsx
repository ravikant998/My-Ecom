import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    user: signupSlice,
    login: loginSlice,
  },
});

export default store;
