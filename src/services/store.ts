import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './ingredients';
import { orderBurgerReducer } from './orderBurger';
import { constructorReducer } from './ingredientsConstructor';
import { orderReducer } from './order';
import { userReducer } from './user';

import { feedReducer } from './feed';
import { userHistorysReducer } from './userHistory';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: constructorReducer,
  orderBurger: orderBurgerReducer,
  order: orderReducer,
  user: userReducer,
  userHistory: userHistorysReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
