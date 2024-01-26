import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
	rows: [],
	count: 0,
	filters: {
		page: 1,
		country: '',
		search: ''
	},
	loading: false,
	error: '',
}

export const getUsers = createAsyncThunk(
	'get/admin-customers',
	async(params) => {
		try {
			const res = await api.get('/users', {params})
			return res.data.payload;
		} catch (e) {
			throw new Error(e.response?.data?.message || 'Something went wrong');
		}
	}
)

const adminCustomersSlice = createSlice({
	name: 'adminCustomers',
	initialState,
	extraReducers (builder) {
		builder.addCase(getUsers.pending, (state, action) => {
			state.loading = true;
			state.filters = action.meta.arg;
			state.error = ''
		}).addCase(getUsers.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		}).addCase(getUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.rows = action.payload.rows;
			state.count = action.payload.count;
		})
	},
})

export default adminCustomersSlice.reducer