import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";

const initialState = {
  newsList: [],
  news: null,
  count: 0,
  loading: false,
  error: "",
};

export const getNewsList = createAsyncThunk(
  "get/news-list",
  async (params, thunkAPI) => {
    try {
      const response = await api.get("/blog", {
        params: { ...params, tags: params.tags?.join(",") },
      });
      let data = response?.data?.payload?.blogs;
      return data;
    } catch (e) {
      if (e.response?.data) throw new Error(e.response.data.message);
      else throw new Error(e.message);
    }
  }
);
export const getNews = createAsyncThunk("get/news", async (params, thunkAPI) => {
  try {
    const response = await api.get(`/blog/${params?.id || 'details/'+params}`);
    let data = response?.data?.payload;
    if (response.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews: (state, action) => {
      state.news = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewsList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNewsList.fulfilled, (state, action) => {
      state.newsList = action?.payload?.rows;
      state.count = action?.payload?.count;
      state.loading = false;
    });
    builder.addCase(getNewsList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getNews.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action?.payload;
      state.loading = false;
      if (action?.payload===null)  state.error = "No data found";
      else state.error = ""
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
  },
});

export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;
