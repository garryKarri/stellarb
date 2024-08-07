import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface feedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isFeedLoading: boolean;
}

const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedLoading: false
};

export const getFeedsAll = createAsyncThunk(
  'feed/ getFeedsAll',
  async (_, { dispatch }) => {
    const data = await getFeedsApi();
    if (data.success) {
      dispatch(resetFeed());
    }

    return data;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {
    resetFeed: () => initialState
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday,
    selectFeedIsLoading: (state) => state.isFeedLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsAll.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isFeedLoading = false;
      })
      .addCase(getFeedsAll.rejected, (state, action) => {
        state.isFeedLoading = false;
      })
      .addCase(getFeedsAll.pending, (state, action) => {
        state.isFeedLoading = true;
      });
  }
});

export const {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedIsLoading
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
export const { resetFeed } = feedSlice.actions;
