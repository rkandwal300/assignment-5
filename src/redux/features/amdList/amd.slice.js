import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveDataToDB } from "@/db/saveDataToDB";
import { fetchDataFromDB } from "@/db/fetchDataFromDB";
import { getData } from "@/lib/getData";

// Constants
export const CARD_WINDOW = 25;
export const TRIGGER_DOWN_INDEX = 15;
export const TRIGGER_UP_INDEX = 5;

// Utility to map data and assign IDs
const mapWithId = (data, start = 0) =>
  data.map((item, index) => ({
    ...item,
    id: start + index,
  }));

// Async Thunks
export const fetchAmdDataPagination = createAsyncThunk(
  "amdList/fetchAmdDataPagination",
  async ({ starting = 0, ending = CARD_WINDOW } = {}, thunkAPI) => {
    try {
      const dbData = await fetchDataFromDB();
      const slicedData = dbData.Data.slice(starting, ending);
      return {
        data: mapWithId(slicedData, starting),
        total: dbData.grandTotal?.NumberOfInstances || 0,
        current: ending,
        startIndex: starting,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch AMD data"
      );
    }
  }
);

export const fetchDefaultAmdData = createAsyncThunk(
  "amdList/fetchDefaultAmdData",
  async (_, thunkAPI) => {
    try {
      const dbData = await fetchDataFromDB();
      if (dbData?.Data?.length) {
        return {
          data: mapWithId(dbData.Data.slice(0, CARD_WINDOW)),
          total: dbData.grandTotal?.NumberOfInstances || 0,
          current: CARD_WINDOW,
        };
      }

      const userData = await getData();
      await saveDataToDB(userData);
      return {
        data: mapWithId(userData.Data.slice(0, CARD_WINDOW)),
        total: userData.grandTotal?.NumberOfInstances || 0,
        current: CARD_WINDOW,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch AMD data"
      );
    }
  }
);

// Initial State
const initialState = {
  data: [],
  total: 0,
  limit: CARD_WINDOW,
  current: 0,
  startIndex: 0,
  loading: false,
  error: null,
  query: "",
};

// Slice
const amdListSlice = createSlice({
  name: "amdList",
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateStartingIndex: (state, action) => {
      state.startIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaultAmdData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultAmdData.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchDefaultAmdData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAmdDataPagination.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export const { updateQuery, updateStartingIndex } = amdListSlice.actions;
export default amdListSlice.reducer;
