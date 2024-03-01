import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  users: { count: null, rows: [], filters: { page: 1 } },
  usersLoader: false,
  userDetails: {},
  userDetailsLoader: false,
};

export const getUsers = createAsyncThunk("get/admin-users", async (filters) => {
  try {
    const response = await api.get("admins", { params: filters });
    return response.data.payload;
  } catch (e) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Somehting went wrong");
  }
});
export const getUserDetails = createAsyncThunk(
  "get/admin-user-details",
  async (id) => {
    try {
      const response = await api.get("admins/" + id);
      return response.data.payload;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Somehting went wrong");
    }
  },
);

export const addUser = createAsyncThunk(
  "add/admin-users",
  async (params, thunkApi) => {
    try {
      const response = await api.post("admins/add", {
        ...params,
        role: "ADMIN",
        timezoneOffset: new Date().getTimezoneOffset(),
      });
      thunkApi.dispatch(getUsers(thunkApi.getState().adminUsers.users.filters));
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);
export const deleteUser = createAsyncThunk(
  "delete/admin-users",
  async ({ id, unblock }, thunkApi) => {
    try {
      const response = await api.post(
        "admins/update-status/" + id,
        {},
        { params: { status: unblock ? "un-block" : "block" } },
      );
      thunkApi.dispatch(getUsers(thunkApi.getState().adminUsers.users.filters));
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);
export const resetUserPassword = createAsyncThunk(
  "reset/admin-user-password",
  async (id) => {
    try {
      const response = await api.post("admins/reset-password/" + id);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);
export const editUser = createAsyncThunk(
  "edit/admin-users",
  async ({ id, payload }, thunkApi) => {
    try {
      const response = await api.put("admins/edit/" + id, payload);
      thunkApi.dispatch(getUsers(thunkApi.getState().adminUsers.users.filters));
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

const usersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    cancelUserDetails(state, action) {
      state.userDetails = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.users.filters = action.meta.arg;
        state.usersLoader = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoader = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersLoader = false;
        state.users.count = action.payload.count;
        state.users.rows = action.payload.rows;
        state.users.filters = action.meta.arg;
      });

    builder
      .addCase(getUserDetails.pending, (state, action) => {
        state.userDetailsLoader = true;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetailsLoader = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetailsLoader = false;
        state.userDetails = action.payload;
      });

    builder
      .addCase(addUser.pending, (state, action) => {
        state.userDetailsLoader = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.userDetailsLoader = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userDetailsLoader = false;
      });

    builder
      .addCase(editUser.pending, (state, action) => {
        state.userDetailsLoader = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.userDetailsLoader = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.userDetailsLoader = false;
      });

    builder
      .addCase(deleteUser.pending, (state, action) => {
        state.userDetailsLoader = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userDetailsLoader = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userDetailsLoader = false;
      });
  },
});

export default usersSlice.reducer;

export const { cancelUserDetails } = usersSlice.actions;
