import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  stories: [],
  blogs: [],
  tags: [],
  isLoading: false,
  error: null,
};

export const getBlogs = createAsyncThunk(
  "get/blogs",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("blog/admin-list", {
        params: params,
      });
      const data = response?.data;

      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteStories = createAsyncThunk(
  "get/story",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("impact-stories/delete" + id);
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const addBlog = createAsyncThunk(
  "add/story",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("blog/add", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const updateBlog = createAsyncThunk(
  "update/story",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "blog/update/" + payload?.id,
        payload?.data
      );
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "delete/Blog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("blog/delete/" + id);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

//

export const getTags = createAsyncThunk(
  "get/tags",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get("blog/tag-list?search=");
      const data = response.data?.payload;

      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const addTag = createAsyncThunk(
  "add/tag",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("blog/tag", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const adminBlogSlice = createSlice({
  name: "adminBlogs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteStories.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteStories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload?.payload?.blogs;
      })
      .addCase(getBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export default adminBlogSlice.reducer;
