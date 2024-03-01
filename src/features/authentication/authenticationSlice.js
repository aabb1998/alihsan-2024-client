import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";
import { createElement } from "react";

const initialState = {
	keepSession: false,
	isReady: false,
  user: null,
	auth: null,
  loading: false,
  error: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const initAuth = createAsyncThunk(
	"init/auth",
	async() => {
		const localStorageData = localStorage.getItem('loggedIn');
		const sessionStorageData = sessionStorage.getItem('loggedIn');

		const data = localStorageData || sessionStorageData;
		if(!data) return null;
		
		const authData = JSON.parse(data);
		api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;

		return authData;
	}
)

export const socialMediaLogin = createAsyncThunk(
	"authenticate/social-media",
	async({body, provider, keepSession}) => {
		try {
			const response = await api.post(
				provider==="google"
					? "auth/googlelogin"
					: "auth/facebooklogin",
				{
					...body,
					timezoneOffset: new Date().getTimezoneOffset(),
				}
			);
			const { payload } = response.data;
			const storage = keepSession ? localStorage : sessionStorage;
			storage.setItem('loggedIn', JSON.stringify({
				token: payload.token,
				role: payload.role,
				authType: provider,
				firstName: payload.firstName,
				lastName: payload.lastName,
				id: payload.id,
				isloggedIn: true,
			}))

      api.defaults.headers.common.Authorization = `Bearer ${response.data.payload?.token}`;
			
			return response.data;
		} catch (e) {
			if(!e.response)
				console.error(e);
      throw new Error(e?.response?.data.message || "Something went wrong");
    }
	}
)

export const loginUser = createAsyncThunk(
  "authenticate/email",
  async ({body, keepSession}, thunkAPI) => {
    try {
      const response = await api.post("auth/login", body);
			const payload = response.data.payload;
			const storage = keepSession ? localStorage : sessionStorage;
			storage.setItem('loggedIn', JSON.stringify({
				token: payload.token,
				role: payload.role,
				authType: 'email',
				firstName: payload.firstName,
				lastName: payload.lastName,
				id: payload.id,
				isloggedIn: true,
			}))
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${payload.token}`;
      return response.data;
    } catch (e) {
			if(!e.response)
				console.error(e);
      throw new Error(e?.response?.data.message || "Something went wrong");
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
      } else {
				if(!e.response)
					console.error(e);
        throw new Error(e.response?.data.message || "Something went wrong");
			}
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

export const captchaValidation = createAsyncThunk(
  "auth/verify-captcha",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("auth/verify-captcha", payload);
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
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        user: null,
				auth: null,
				isReady: true,
				loading: false,
				error: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
				state.isFetching = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      });
		
		builder
			.addCase(initAuth.fulfilled, (state, action) => {
				state.auth = action.payload;
				state.isReady = true;
			})
		
		builder
			.addCase(socialMediaLogin.fulfilled, (state, action) => {
				const payload = action.payload.payload;
				state.user = payload;
				state.auth = {
					token: payload.token,
					role: payload.role,
					authType: action.meta.arg.provider,
					firstName: payload.firstName,
					lastName: payload.lastName,
					id: payload.id,
					isloggedIn: true,
				}
				state.loading = false;
			})
			.addCase(socialMediaLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error;
			})
			.addCase(socialMediaLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			});
	
		builder
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

    builder
			.addCase(loginUser.fulfilled, (state, action) => {
				const payload = action.payload.payload;
				state.user = payload;
				state.auth = {
					token: payload.token,
					role: payload.role,
					authType: 'email',
					firstName: payload.firstName,
					lastName: payload.lastName,
					id: payload.id,
					isloggedIn: true,
				}
				state.loading = false;
			})
			.addCase(loginUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.user = null;
				state.loading = false;
				state.error = action.error;
			});
  },
});

export default authenticationSlice.reducer;
export const logout = authenticationSlice.actions.logout;
