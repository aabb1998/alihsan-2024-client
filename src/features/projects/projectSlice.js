import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjectsApi } from './projectsApi'
import { api } from "../../../src/utils/api";

const initialState = {
  projects: [],
  categories: [],
  menu: {
    loading: false,
    projects: [],
    category: null,
  },
  countries: [],
  count: 0,
  loading: false,
  error: "",
};

export const getMenuProjects = createAsyncThunk(
  "get/menu-projects",
  async (category) => {
    try {
      return await getProjectsApi({ category, page: 1, limit: 6 })
    } catch (e) {
      console.error(e)
      if(e.response?.data) throw new Error(e.response.data.message)
      else throw new Error(e.message);
    }
  }
);

export const getProjects = createAsyncThunk(
  "get/projects",
  async (filters, thunkAPI) => {
    try {
      return await getProjectsApi(filters)
    } catch (e) {
      console.error(e)
      if(e.response?.data) throw new Error(e.response.data.message)
      else throw new Error(e.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "get/categories",
  async (thunkAPI) => {
    try {
      const response = await api.get("project/filters");
      let data = response?.data?.payload;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenuProjects.pending, (state, action) => {
      state.menu.category = action.meta.arg
      state.menu.loading = true;
      state.menu.projects = [];
    }).addCase(getMenuProjects.fulfilled, (state, action) => {
      state.menu.loading = false;
      state.menu.projects = action.payload.projects.rows;
    }).addCase(getMenuProjects.rejected, (state, action) => {
      state.menu.loading = false;
      state.menu.projects = [];
    });
    builder.addCase(getProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action?.payload?.projects?.rows;
      state.count = action?.payload?.projects?.count;
      state.error = "";
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = "";
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action?.payload?.category;
      state.countries = action?.payload?.country;
    });
  },
});

export const selectCount = (state) => state.projects;

export default projectSlice.reducer;
