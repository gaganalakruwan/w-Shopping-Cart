import {createSlice} from '@reduxjs/toolkit';
import {cartDataType, cartSliceType} from 'type';

const initialState: cartSliceType = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: cartDataType) => item.id !== action.payload,
      );
    },
  },
});

export const {addCartItem, removeCartItem} = cartSlice.actions;
export default cartSlice.reducer;
