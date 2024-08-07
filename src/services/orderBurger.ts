import { orderBurgerApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TBurgerState = {
  ingredients: string[];
  order: TOrder | null;
  isOrderBurgerLoading: boolean;
};

const initialState: TBurgerState = {
  ingredients: [],
  order: null,
  isOrderBurgerLoading: false
};

export const createOrderBurger = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

const orderBurger = createSlice({
  name: 'orderBurger',
  initialState: initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    },
    resetIngredients: (state) => {
      state.ingredients = [];
    }
  },
  selectors: {
    selectOrderBurger: (state) => state.order,
    selectOrderIngredients: (state) => state.ingredients,
    selectOrderIsLoading: (state) => state.isOrderBurgerLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.ingredients = action.payload.order.ingredients;
        state.isOrderBurgerLoading = false;
      })
      .addCase(createOrderBurger.rejected, (state, action) => {
        state.isOrderBurgerLoading = false;
      })
      .addCase(createOrderBurger.pending, (state, action) => {
        state.isOrderBurgerLoading = true;
      });
  }
});

export const orderBurgerReducer = orderBurger.reducer;
export const {
  selectOrderIsLoading,
  selectOrderIngredients,
  selectOrderBurger
} = orderBurger.selectors;
export const { resetOrder, resetIngredients } = orderBurger.actions;
