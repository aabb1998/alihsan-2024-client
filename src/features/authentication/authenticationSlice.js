import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";

const initialState = {
  user: null,
  loading: false,
  error: "",
  //
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const loginUser = createAsyncThunk(
  "authenticat/user",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("auth/login", payload);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.payload?.token}`;
      return response.data;
    } catch (e) {
      throw new Error(e?.response?.data.message || "Something went wrong");

      // return e.response.data;
    }
  }
);

export const getProfile = createAsyncThunk(
  "get/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("profile");
      let data = response?.data?.payload;
      return data;
    } catch (e) {
      if (e.response?.status == 401) {
        const currentUrl = window.location.href;
        const isCheckoutUrl =
          currentUrl.includes("checkout") ||
          currentUrl.includes("thank-you") ||
          currentUrl.includes("confirm");
        if (!isCheckoutUrl) {
          localStorage.removeItem("loggedIn");
          sessionStorage.removeItem("loggedIn");
          window.location.href = "login";
        }
      } else
        throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "post/addNewPost",
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch("profile", payload);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "delete/profile",
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete("profile", payload);
      let data = response?.data?.payload;
      if (response.status === 200) {
        localStorage.removeItem("loggedIn");
        sessionStorage.removeItem("loggedIn");
        window.location.href = "login";
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  "post/changePassword",
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch("profile/password", payload);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// profile/password

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout(state, action) {
      return {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        user: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        for (let i in action.meta.arg) {
          state[i] = action.meta.arg[i];
        }
        state.isFetching = false;
        state.isError = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.errorMessage = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default authenticationSlice.reducer;
export const logout = authenticationSlice.actions.logout;
