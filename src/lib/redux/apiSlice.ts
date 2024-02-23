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
  fields: Record<string, any>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ApiState = {
  ids: [],
  items: {},
  fields: {},
  loading: 'idle',
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
        state.loading = 'pending';
      })
      .addCase(fetchIds.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.ids = action.payload;
      })
      .addCase(fetchIds.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch ids';
      })
      .addCase(fetchItems.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = 'succeeded';
		if (Array.isArray(action.payload)) {
			action.payload.forEach((item: Item) => {
				state.items[item.id] = item;
			  });
			}
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export const selectIds = (state: { api: ApiState }) => state.api.ids;
export const selectItems = (state: { api: ApiState }) => state.api.items;
export const selectLoading = (state: { api: ApiState }) => state.api.loading;
export const selectError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;
















/* export const fetchTodos = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
		if (!response.ok) {
			return rejectWithValue('Server error!');
		}
		const data = await response.json();
		return data;
	}
)
export const addNewTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
	'todos/addNewTodo',
	async function (text, { rejectWithValue }) {
		const todo = {
			title: text,
			userId: 1,
			completed: false,
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todo)
		});

		if (!response.ok) {
			return rejectWithValue('Can\'t add task. Server error.');
		}
		return (await response.json()) as Todo;
	}
)
export const toggleStatus = createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodosState } }>(
	'todos/toggleStatus',
	async function (id, { rejectWithValue, getState }) {
		const todo = getState().todos.list.find(todo => todo.id === id);

		if (todo) {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					completed: !todo.completed,
				})
			});

			if (!response.ok) {
				return rejectWithValue('Can\'t toggle status. Server error.');
			}
			return (await response.json()) as Todo;
		}
		return rejectWithValue('No such todo in the list!')
	}
)

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
	'todos/deleteTodo',
	async function (id, { rejectWithValue }) {
		const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			return rejectWithValue('Can\'t delete task. Server error.');
		}
		return id;
	}

)



const productSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.list = action.payload;
				state.loading = false;
			})
			.addCase(addNewTodo.pending, (state) => {
				state.error = null;
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				state.list.push(action.payload);
			})
			.addCase(toggleStatus.fulfilled, (state, action) => {
				const toggledTodo = state.list.find(todo => todo.id === action.payload.id);
				if (toggledTodo) {
					toggledTodo.completed = !toggledTodo.completed;
				}
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.list = state.list.filter(todo => todo.id !== action.payload);
			})
			.addMatcher(isError, (state, action: PayloadAction<string>) => {
				state.error = action.payload;
				state.loading = false;
			})
	}
})

// export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;
export default productSlice.reducer;

function isError(action: UnknownAction) {
	return action.type.endsWith('rejected');
} */