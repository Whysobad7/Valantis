import { apiRequest } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Item {
	id: string;
	product: string;
	price: number;
	brand?: string
}

interface ApiState {
  ids: string[];
  items: Record<string, Item>;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  ids: [],
  items: {},
  loading: false,
  error: null,
};

export const fetchIds = createAsyncThunk('api/fetchIds', async ({ offset = 0, limit = 50 }: { offset?: number; limit?: number }) => {
	return apiRequest('get_ids', { offset, limit });
  });

  export const fetchItems = createAsyncThunk('api/fetchItems', async (ids: string[]) => {
	return apiRequest('get_items', { ids });
  });

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIds.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload;
      })
      .addCase(fetchIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ids';
      })
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
		if (Array.isArray(action.payload)) {
			action.payload.forEach((item: Item) => {
				state.items[item.id] = item;
			  });
			}
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export const selectIds = (state: { api: ApiState }) => state.api.ids;
export const selectItems = (state: { api: ApiState }) => state.api.items;
export const selectLoading = (state: { api: ApiState }) => state.api.loading;
export const selectError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;



