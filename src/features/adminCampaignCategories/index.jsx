import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  rows: [],
  count: 0,
  filters: {
    page: 1,
    search: "",
  },
  loader: true,
  error: "",
};

export const getCategories = createAsyncThunk(
  "get/admin-camapign-category",
  async (params) => {
    try {
      const response = await api.get("/project/category-list", { params });
      return response.data.payload;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

export const createCategory = createAsyncThunk(
  "create/admin-campaign-category",
  async (params, thunkApi) => {
    try {
      const response = await api.post("/project/category", params);
      thunkApi.dispatch(getCategories());
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "delete/admin-campaign-category",
  async (id, thunkApi) => {
    try {
      const response = await api.delete("/project/category/" + id);
      thunkApi.dispatch(getCategories());
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

export const editCategory = createAsyncThunk(
  "edit/admin-campaign-category",
  async ({ id, payload }, thunkApi) => {
    try {
      const response = await api.patch("/project/category/" + id, payload);
      thunkApi.dispatch(getCategories());
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

const slice = createSlice({
  name: "adminCampaignCategories",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.loader = true;
        state.error = "";
        if (action.meta.arg) state.filters = { ...action.meta.arg };
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loader = false;
        state.rows = action.payload.rows;
        state.count = action.payload.count;
        if (action.meta.arg) state.filters = { ...action.meta.arg };
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });

    builder
      .addCase(createCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loader = false;
      });

    builder
      .addCase(deleteCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loader = false;
      });

    builder
      .addCase(editCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loader = false;
      });
  },
});

export default slice.reducer;
