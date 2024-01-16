import { api } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

export const submitSupport = createAsyncThunk("form/technical-support-add", async (data) => {
  try {
    const response = await api.post("form/technical-support-add", data);
    if (response.status === 200) {
      return response?.data;
    } else {
      return response?.data;
    }
  } catch (e) {
    return e.response.data;
  }
});
export const technicalSupportSlice = createSlice({
  name: "technicalSupport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitSupport.pending, (state, action) => {
        state.menu.category = action.meta.arg;
        state.menu.loading = true;
      })
      .addCase(submitSupport.fulfilled, (state, action) => {
        state.menu.loading = false;
      })
      .addCase(submitSupport.rejected, (state, action) => {
        state.menu.loading = false;
      });
  },
});
export default technicalSupportSlice.reducer;
