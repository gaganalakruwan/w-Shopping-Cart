import {configureStore} from '@reduxjs/toolkit';

import productDataReducer from '../features/productDataSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    allProductData: productDataReducer,
    cartData: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
