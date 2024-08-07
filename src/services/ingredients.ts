import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TBurgerState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsIsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.pending, (state, action) => {
        state.isIngredientsLoading = true;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { selectIngredients, selectIngredientsIsLoading } =
  ingredientsSlice.selectors;
