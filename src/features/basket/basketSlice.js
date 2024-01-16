import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";

const initialState = {
  basketItems: [],
  interestedItems: [],
  zakatItem: null,
  count: 0,
  loading: false,
  isBasketOpen: false,
  isAnonymous: false,
  error: "",
};

export const getBasketItems = createAsyncThunk(
  "get/basketItems",
  async (thunkAPI) => {
    try {
      const response = await api.get("basket");
      const data = response?.data?.payload?.map((item) => {
        return {
          ...item,
          coverImage: item?.Campaign?.coverImage,
          name: item?.Campaign?.name,
        };
      });
      if (response.status === 200) {
        localStorage.setItem("checkout", JSON.stringify(data));
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return localStorage.getItem("checkout")
          ? JSON.parse(localStorage.getItem("checkout"))
          : [];
      }
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const addBasketItem = createAsyncThunk(
  "add/donation",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("basket", data);
      let datas = response?.data?.payload;
      if (response.status === 200) {
        return datas;
      } else {
        return thunkAPI.rejectWithValue(datas);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const bulkAddDonation = createAsyncThunk(
  "add/donations",
  async (data, thunkAPI) => {
    try {
      const response = await api.put("basket/all", data);
      let datas = response?.data?.payload;
      if (response.status === 200) {
        return datas;
      } else {
        return thunkAPI.rejectWithValue(datas);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateBasketItem = createAsyncThunk(
  "add/donation",
  async (data, thunkAPI) => {
    try {
      const response = await api.put("basket", data);
      let datas = response?.data?.payload;
      if (response.status === 200) {
        return datas;
      } else {
        return thunkAPI.rejectWithValue(datas);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const removeBasketItem = createAsyncThunk(
  "remove/basketItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete("basket", {
        data: { campaignId: parseInt(payload?.campaignId) },
      });
      if (response.status === 200) {
        return payload?.campaignId;
      } else {
        return thunkAPI.rejectWithValue(payload?.campaignId);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return payload?.campaignId;
      }
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getInterestedItems = createAsyncThunk(
  "get/interestedItem",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("project/interested", [230]);
      if (response.status === 200) {
        return response?.data?.payload;
      } else {
        return thunkAPI.rejectWithValue(response?.data?.payload);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return payload;
      }
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getAnyZakatCampaign = createAsyncThunk(
  "get/any-zakat-campaign",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("project/get-any-zakat-campaign");
      if (response.status === 200) {
        return response?.data?.payload;
      } else {
        return thunkAPI.rejectWithValue(response?.data?.payload);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return payload;
      }
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const handleBasketCheckout = createAsyncThunk(
  "handle/basketCheckout",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/basket/checkout", payload);
      if (response.status === 200) {
        return response?.data;
      } else {
        return thunkAPI.rejectWithValue(response?.data?.payload);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return payload;
      }
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const handlePaypalCheckout = createAsyncThunk(
  "handle/paypalCheckout",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/basket/paypal-checkout", payload);
      if (response.status === 200) {
        return response?.data;
      } else {
        return thunkAPI.rejectWithValue(response?.data?.payload);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return payload;
      }
      // console.log(e.response?.payload?.payload?.error)
      return thunkAPI.rejectWithValue(e.response?.payload?.payload?.error);
    }
  }
);

export const basketSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    emptyBasket: (state, action) => {
      state.basketItems = [];
    },
    updateBasket: (state, action) => {
      state.basketItems = [...state.basketItems, action?.payload];
    },
    editBasket: (state, action) => {
      const { index, newValue } = action.payload;
      const newBasketItems = [...state.basketItems];
      newBasketItems[index] = newValue;
      localStorage.setItem("checkout", JSON.stringify(newBasketItems));
      state.basketItems = newBasketItems;
    },
    addBasket: (state, action) => {
      state.basketItems = action?.payload;
    },
    toggleBasket: (state) => {
      state.isBasketOpen = !state.isBasketOpen;
    },
    setIsAnonymous: (state, action) => {
      state.isAnonymous = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBasketItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBasketItems.fulfilled, (state, action) => {
      state.loading = false;
      state.basketItems = action?.payload;
      state.error = "";
    });
    builder.addCase(getBasketItems.rejected, (state, action) => {
      state.loading = false;
      state.basketItems = [];
      state.error = "";
    });
    builder.addCase(removeBasketItem.fulfilled, (state, action) => {
      state.loading = false;
      state.basketItems = state?.basketItems.filter(
        (item) => item.campaignId !== action.payload
      );
      state.error = "";
    });
    builder.addCase(removeBasketItem.rejected, (state, action) => {
      state.loading = false;
      state.basketItems = [];
      state.error = "";
    });
    builder.addCase(getInterestedItems.fulfilled, (state, action) => {
      state.interestedItems = action?.payload;
    });
    builder.addCase(getAnyZakatCampaign.fulfilled, (state, action) => {
      state.loading = false;
      state.zakatItem = action?.payload;
    });
    builder.addCase(getAnyZakatCampaign.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAnyZakatCampaign.rejected, (state, action) => {
      state.loading = false;
      state.zakatItem = [];
    });

    //
  },
});

export const {
  emptyBasket,
  updateBasket,
  addBasket,
  toggleBasket,
  setIsAnonymous,
  editBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
