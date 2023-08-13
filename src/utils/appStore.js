import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
	reducer: {
		cart: cartReducer,
	},
}); // here inside we will create a slice



export default appStore;