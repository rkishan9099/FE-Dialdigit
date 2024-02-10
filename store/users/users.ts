import axiosInstance from "@/Utils/axios";
import { UserApiUrl } from "@/configs/apiUrlConstant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserStateType {
  users: any[];
  isLoading: boolean;
  accessToken: string;
  refreshToken: string;
}
const initialState: UserStateType = {
  users: [],
  isLoading: false,
  accessToken: "",
  refreshToken: "",
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserState: (
      state,
      action: {
        type: string;
        payload: {
          key: keyof UserStateType;
          value: UserStateType[keyof UserStateType];
        };
      }
    ) => {
      const { key, value } = action.payload;
      if (key && key in state) {
        // @ts-ignore
        state[key] = value;
      } else {
        console.error(`Invalid key: ${key}`);
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
      // console.debug("action", action.payload);
      state.users=action.payload.data
    });
  },
});

export const fetchUser = createAsyncThunk(
  "users/update",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(UserApiUrl.getUser);
      return response.data;
    } catch (err: any) {
      if (!err?.response) {
        throw err;
      }

      return rejectWithValue(err?.response?.data);
    }
  }
);
export const { updateUserState } = slice.actions;

export default slice.reducer;
