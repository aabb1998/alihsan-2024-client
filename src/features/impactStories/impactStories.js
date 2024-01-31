import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";

const initialState = {
  impactStories: [],
  impactStory: null,
  count: 0,
  loading: false,
  error: "",
};

export const getImpactStories = createAsyncThunk(
  "get/impactStories",
  async (params, thunkAPI) => {
    try {
      const response = await api.get("impact-stories", {
        params: params,
      });
      let data = response?.data?.payload?.impactStories;
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

export const deleteImpactStories = createAsyncThunk(
  "delete/impactStories",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete("impact-stories/delete/" + id);
      let data = response?.data;
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

export const getImpactStory = createAsyncThunk(
  "get/impactStory",
  async (params, thunkAPI) => {
    try {
      const response = await api.get(`/impact-stories/${typeof params==='string'?params:'details/'+params.id}`);
      let data = response?.data?.payload?.impactStories;
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

export const impactStorySlice = createSlice({
  name: "impactStory",
  initialState,
  reducers: {
    resetImpactStory: (state, action) => {
      state.impactStory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getImpactStories.fulfilled, (state, action) => {
      state.impactStories = action?.payload?.rows;
      state.count = action?.payload?.count;
      state.loading = false;
    });
    builder.addCase(getImpactStories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getImpactStories.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getImpactStory.fulfilled, (state, action) => {
      state.impactStory = action?.payload;
      state.loading = false;
    });
    builder.addCase(getImpactStory.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getImpactStory.rejected, (state, action) => {
      console.log(action?.payload?.message);
      state.loading = false;
      state.error = action?.payload?.message;
    });

    builder.addCase(deleteImpactStories.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteImpactStories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteImpactStories.rejected, (state, action) => {
      state.loading = false;
    });

    //
  },
});

export const { resetImpactStory } = impactStorySlice.actions;
export default impactStorySlice.reducer;
