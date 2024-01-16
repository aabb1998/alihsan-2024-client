import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  medias: [],
  media: null,
  isLoading: false,
  error: null,
};
export const getMedias = createAsyncThunk(
  "get/medias",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(payload.url, {
        params: payload.filter,
      });
      const pathDispatchMap = {
        "media/videos/": "mediaVideos",
        "media/post-updates/": "mediaUpdates",
      };
      const data = response?.data?.payload[pathDispatchMap[payload.url]];
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const getMediaPost = createAsyncThunk(
  "get/media-post",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get("/media/post-updates/" + id);
      const data = response?.data?.payload?.mediaPost;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getMediaVideo = createAsyncThunk(
  "get/media-video",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get("/media/videos/" + id);

      const data = response?.data?.payload;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
////////////////////////////////////////

export const updatePostDetails = createAsyncThunk(
  "update/media-post",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/media/update-post/" + payload?.id,
        payload.data
      );

      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const addPostDetails = createAsyncThunk(
  "add/media-post",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/media/add-post", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
///////////////////////////////////////////////////
export const updateVideoDetails = createAsyncThunk(
  "update/media-video",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/media/update-video/" + payload?.id,
        payload.data
      );
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const addVideoDetails = createAsyncThunk(
  "add/media-video",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/media/add-video", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteMedia = createAsyncThunk(
  "delete/media",
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete(payload);
      if (response.status === 200) {
      } else {
        return thunkAPI.rejectWithValue(response?.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const adminMediaSlice = createSlice({
  name: "adminStories",
  initialState,
  reducers: {
    resetMedia: (state, action) => {
      state.media = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMedias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medias = action.payload;
      })
      .addCase(getMedias.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMedias.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getMediaPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.media = action.payload;
      })
      .addCase(getMediaPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMediaPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getMediaVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.media = action.payload;
      })
      .addCase(getMediaVideo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMediaVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    ///////////////////////
    builder
      .addCase(updatePostDetails.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePostDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePostDetails.rejected, (state, action) => {
        state.isLoading = false;
      });
    //////////////////////////
    builder
      .addCase(addPostDetails.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPostDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPostDetails.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateVideoDetails.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateVideoDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateVideoDetails.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(addVideoDetails.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addVideoDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addVideoDetails.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { resetMedia } = adminMediaSlice.actions;
export default adminMediaSlice.reducer;
