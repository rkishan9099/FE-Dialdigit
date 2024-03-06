import axiosInstance from "@/Utils/axios";
import { getUser } from "@/actions/userActions";
import { RolesApiUrl, UserApiUrl } from "@/configs/apiUrlConstant";
import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserStateType {
  users: any[];
  isLoading: boolean;
  accessToken: string;
  refreshToken: string;
  roles: any[];
  isError: boolean;
  error: any;
  total: number;
  selectedUser: any;
}
const initialState: UserStateType = {
  users: [],
  total: 0,
  isLoading: false,
  accessToken: "",
  refreshToken: "",
  roles: [],
  isError: false,
  error: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // START LOADING
    startLoadind(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.users = [];
    },
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
    geuUserstSuccess(state, action) {
      console.debug("action", action.payload);
      state.isLoading = false;
      state.users = action.payload.data || [];
      state.total = action.payload.totalItems || 0;
      state.error = null;
    },
    getSelectedUserSuccess(state, action) {
      if (action.payload) {
        state.selectedUser = {
          ...action.payload,
          name: `${action.payload.firstName} ${action.payload.lastName}`,
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
      // console.debug("action", action.payload);
      state.users = action.payload.data;
    });
    builder.addCase(getUserRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
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

export function getUsersList(params: any = {}) {
  console.debug("sss", params);
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoadind());
    try {
      const response = await axiosInstance.post(UserApiUrl.getUser, {
        ...params,
      });
      dispatch(slice.actions.geuUserstSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));

      return error;
    }
  };
}

export function getUserById(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get(UserApiUrl.getUserById(id));
      dispatch(slice.actions.getSelectedUserSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));

      return error;
    }
  };
}

export const createUser = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(UserApiUrl.createUser, data);

      return response;
    } catch (error) {
      return error;
    }
  };
};

export const updateUser = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.patch(
        UserApiUrl.updateUser(data.id),
        data
      );

      return response;
    } catch (error) {
      return error;
    }
  };
};

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.delete(UserApiUrl.deleteUser(id));

      return response;
    } catch (error) {
      return error;
    }
  };
};

export const getUserRoles = createAsyncThunk(
  "users/roles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(RolesApiUrl.role.get);
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
