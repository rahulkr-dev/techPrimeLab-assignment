import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { countDocument, departmentStatus } from "./dashboard.api";

const initialState = {
  loading: false,
  error: null,
  documentCount: [],
  departmentWiseStatus: [],
};

export const getCountDocument = createAsyncThunk(
  "project/dashboard/count",
  async () => {
    try {
      let res = await countDocument();
      // console.log("res",res)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getDepartmentStatus = createAsyncThunk(
  "/project/dashboard/departmentStaus",
  async () => {
    let res = await departmentStatus();
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountDocument.fulfilled, (state, action) => {
        state.loading = false;
        let data = [];
        for (let key in action.payload) {
          let obj = {
            title: key,
            value: action.payload[key],
          };
          data.push(obj);
        }
        state.documentCount = data;
        // console.log("inside",action.payload)
      })
      .addCase(getCountDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDepartmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentWiseStatus = action.payload;
        // console.log(action)
      })
      .addCase(getDepartmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
