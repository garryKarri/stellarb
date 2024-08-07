import { getOrdersApi } from '@api';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TBurgerState = {
  orders: TOrder[];
  isHistoryLoading: boolean;
};

const initialState: TBurgerState = {
  isHistoryLoading: false,
  orders: []
};

export const getUserOrders = createAsyncThunk(
  'userHistory/getOrders',
  getOrdersApi
);

const userOrderSlice = createSlice({
  name: 'userHistory',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectHistoryLoading: (state) => state.isHistoryLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isHistoryLoading = false;
        }
      )
      .addCase(getUserOrders.pending, (state) => {
        state.isHistoryLoading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isHistoryLoading = false;
      });
  }
});

export const userHistorysReducer = userOrderSlice.reducer;
export const { selectUserOrders, selectHistoryLoading } =
  userOrderSlice.selectors;
