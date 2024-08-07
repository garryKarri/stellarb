import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState: initialState,
  selectors: {
    selectChoosingIngredients: (state) => state.ingredients,
    selectChoosingBun: (state) => state.bun
  },
  reducers: {
    addChoosingIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients = [...state.ingredients, action.payload];
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();

        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveUpIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = action.payload;
        state.ingredients[index] = temp;
      }
    },
    moveDownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = action.payload;
        state.ingredients[index] = temp;
      }
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addBun,
  addChoosingIngredient,
  removeIngredient,
  resetConstructor,
  moveUpIngredient,
  moveDownIngredient
} = constructorSlice.actions;

export const { selectChoosingIngredients, selectChoosingBun } =
  constructorSlice.selectors;
