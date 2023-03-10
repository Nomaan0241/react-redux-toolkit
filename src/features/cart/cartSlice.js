import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
	return fetch(url)
		.then((resp) => resp.json())
		.catch((err) => console.log(err));
});

const initialState = {
	// cartItems: cartItems,
	cartItems: [],
	amount: 1,
	total: 0,
	isLoading: true,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
		},
		increase: (state, action) => {
			const itemId = action.payload;
			const cartItem = state.cartItems.find((item) => item.id === itemId);
			cartItem.amount = cartItem.amount + 1;
		},
		decrease: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},
		calculateTotal: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += parseFloat(item.price) * item.amount;
			});
			state.amount = amount;
			state.total = total;
			console.log(amount, total);
		},
	},
	extraReducers: {
		[getCartItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getCartItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
	cartSlice.actions;

export default cartSlice.reducer;
