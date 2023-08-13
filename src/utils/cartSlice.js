import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const initialState = {
	cartItems: Cookies.get("cartItems")
		? JSON.parse(Cookies.get("cartItems"))
		: [],
	cartTotalQuantity: 0,
	cartTotalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(index) => index?.card?.info?.id === action.payload.card?.info?.id
			);

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].itemQuantity += 1;
			} else {
				let tempCartItem = { ...action.payload, itemQuantity: 1 };
				state.cartItems.push(tempCartItem);
			}
			Cookies.set("cartItems", JSON.stringify(state.cartItems));
		},
		clearCart: (state) => {
			(state.cartItems = []),
				toast.info("Your Cart is Cleared !", {
					position: "bottom-left",
					autoClose: 1000,
					theme: "colored",
				});

			Cookies.set("cartItems", JSON.stringify(state.cartItems));
		},
		removeCartItem: (state, action) => {
			let newcartItems = state.cartItems.filter(
				(item) => item?.card?.info?.id !== action.payload
			);
			state.cartItems = newcartItems;
			Cookies.set("cartItems", JSON.stringify(state.cartItems));
			toast.info("One Item has been removed from your cart !", {
				position: "bottom-left",
				autoClose: 1000,
				theme: "colored",
			});
		},
		decreaseQuantityItem: (state, action) => {
			const index = state.cartItems.findIndex(
				(targetIndex) => targetIndex?.card?.info?.id === action.payload
			);
			if (state.cartItems[index].itemQuantity > 1) {
				state.cartItems[index].itemQuantity -= 1;
			}
			Cookies.set("cartItems", JSON.stringify(state.cartItems));
		},
        getTotals: (state, action) => {
            let { total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price } = cartItem?.card?.info
                const { itemQuantity } = cartItem;
                const itemTotal = (price/100) * itemQuantity;
                cartTotal.total += itemTotal;
                cartTotal.quantity += itemQuantity;

                return cartTotal;

            }, {
                total : 0,
                quantity : 0
            })
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
	},
});

export const {
	addToCart,
	clearCart,
	removeCartItem,
	decreaseQuantityItem,
	getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
