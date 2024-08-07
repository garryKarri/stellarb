import { getOrderByNumberApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TBurgerState = {
  order: TOrder | null;
  isOrderLoading: boolean;
};

const initialState: TBurgerState = {
  order: null,
  isOrderLoading: false
};

export const getOrder = createAsyncThunk('order/getOrder', getOrderByNumberApi);

const order = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectOrder: (state) => state.order,
    selectIsLoading: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isOrderLoading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.isOrderLoading = true;
      });
  }
});

export const orderReducer = order.reducer;
export const { selectOrder, selectIsLoading } = order.selectors;
