import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";

const initialState = {
  postUpdates: {
    rows: [],
    count: 0,
    loading: false,
    error: "",
  },
  groundVideos: {
    rows: [],
    count: 0,
    loading: false,
    error: "",
  },
  mediaPost: {},
  relatedPost: [],
  mediaVideo: {},
  error: "",
};

export const getMediaGroundVideos = createAsyncThunk(
  "media/get-ground-videos",
  async (params) => {
    try {
      const response = await api.get("media/videos", {
        params: params,
      });
      let data = response.data.payload.mediaVideos;
      return data;
    } catch (e) {
      throw new Error(e.response?.data?.message || e.message);
    }
  }
);
export const getMediaPostUpdates = createAsyncThunk(
  "media/get-post-updates",
  async (params) => {
    try {
      const response = await api.get("media/post-updates", {
        params: params,
      });
      let data = response.data.payload.mediaUpdates;
      return data;
    } catch (e) {
      throw new Error(e.response?.data?.message || e.message);
    }
  }
);

export const getMediaDetails = createAsyncThunk(
  "media/details",
  async (slug, thunkAPI) => {
    try {
      const response = await api.get(`/media/post-updates-slug/${slug}`);
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

export const getMediaVideo = createAsyncThunk(
  "media/video",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/media/videos/${id}`);
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

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMediaPostUpdates.fulfilled, (state, action) => {
        state.postUpdates = {
          ...action.payload,
          loading: false,
          error: "",
        };
      })
      .addCase(getMediaPostUpdates.pending, (state, action) => {
        state.postUpdates.loading = true;
        state.postUpdates.error = "";
      })
      .addCase(getMediaPostUpdates.rejected, (state, action) => {
        state.postUpdates.loading = false;
        state.postUpdates.error = action.error.message;
      });

    builder
      .addCase(getMediaGroundVideos.fulfilled, (state, action) => {
        state.groundVideos = {
          ...action.payload,
          loading: false,
          error: "",
        };
      })
      .addCase(getMediaGroundVideos.pending, (state, action) => {
        state.groundVideos.loading = true;
        state.groundVideos.error = "";
      })
      .addCase(getMediaGroundVideos.rejected, (state, action) => {
        state.groundVideos.loading = false;
        state.groundVideos.error = action.error.message;
      });
    builder.addCase(getMediaDetails.pending, (state, action) => {
      state.loading = true;
      state.error=""
    });
    builder.addCase(getMediaDetails.fulfilled, (state, action) => {
      state.mediaPost = action?.payload?.mediaPost;
      state.relatedPost = action?.payload?.relatedPost;
      state.loading = false;
      state.error=""

    });
    builder.addCase(getMediaDetails.rejected, (state, action) => {
      state.loading = false;
      state.error=""
      state.error=action?.payload?.message

    });
    builder.addCase(getMediaVideo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMediaVideo.fulfilled, (state, action) => {
      state.mediaVideo = action?.payload;
      state.loading = false;
    });
    builder.addCase(getMediaVideo.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default mediaSlice.reducer;
