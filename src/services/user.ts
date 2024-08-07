import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';

export interface IUserState {
  isChecked: boolean;
  isLogin: boolean;
  user: TUser | null | undefined;
  isUserLoading: boolean;
  error: string | null | undefined;
}

const initialState: IUserState = {
  isChecked: false,
  isLogin: false,
  user: null,
  isUserLoading: false,
  error: null
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return;
    }

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

//TODO: maybe needed check susses response
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const checkLogin = createAsyncThunk(
  'user/checkLogin',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      await dispatch(getUser());
    }
    dispatch(checkIsAuth());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    checkIsAuth: (state) => {
      state.isChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    selectIsChecked: (state) => state.isChecked,
    selectIsLogin: (state) => state.isLogin,
    selectUser: (state) => state.user,
    selectUserLoading: (state) => state.isUserLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
        state.isChecked = true;
        state.isUserLoading = false;
        state.error = null;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
        state.isChecked = true;
        state.isUserLoading = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogin = true;
        state.isChecked = true;
        state.isUserLoading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
        state.isChecked = true;
        state.isUserLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isLogin = false;
        state.isChecked = true;
        state.isUserLoading = false;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const userReducer = userSlice.reducer;
export const { checkIsAuth, clearError } = userSlice.actions;
export const {
  selectIsChecked,
  selectIsLogin,
  selectUser,
  selectUserLoading,
  selectError
} = userSlice.selectors;
