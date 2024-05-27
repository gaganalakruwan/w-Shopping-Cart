import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getProductData} from '@services/api';
import {productAllDataType, productDataType} from 'type';

const initialState: productAllDataType = {
  allProductData: [],
  isProductLoading: true,
};

export const getAllProductDetails = createAsyncThunk(
  'allProductData/getAllProductDetails',

  async (_state, {dispatch}) => {
    try {
      const response = await getProductData();
      return {
        result: response.data.result,
        data: response.data.data as productDataType[],
      };
    } catch (error) {
      const message = JSON.stringify(error);
      console.log('artwork_error', message);
      throw new Error('No items found');
    }
  },
);

export const productDataslice = createSlice({
  name: 'allProductData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProductDetails.pending, state => {
        state.isProductLoading = true;
      })
      .addCase(getAllProductDetails.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.allProductData = action.payload.data;
      })
      .addCase(getAllProductDetails.rejected, (state, action) => {
        state.isProductLoading = false;
      });
  },
});

export default productDataslice.reducer;
