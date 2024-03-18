import axiosInstance from "@/Utils/axios";
import { getUser } from "@/actions/userActions";
import {
  NumberApiUrl,
  RolesApiUrl,
  UserApiUrl,
} from "@/configs/apiUrlConstant";
import { ApiResponseType } from "@/types/apps/apiTypes";
import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

interface NumberStattype {
  numbers: any[];
  isLoading: boolean;
  avilableNumbers: any[];
  error: any;
  activeSubscription: any;
}
type key = keyof NumberStattype;
type value = NumberStattype[keyof NumberStattype];

type UpdateStatePayload = {
  key: key;
  value: value;
};

const initialState: NumberStattype = {
  numbers: [],
  isLoading: false,
  avilableNumbers: [],
  error: null,
  activeSubscription: null,
};

const slice = createSlice({
  name: "numbers",
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
      state.numbers = [];
    },
    updateNumberState: (state, action: PayloadAction<UpdateStatePayload>) => {
      const { key, value } = action.payload;
      if (key && key in state) {
        // @ts-ignore
        state[key] = value;
      } else {
        console.error(`Invalid key: ${key}`);
      }
    },
    getSearchNumberSuccess(state, action) {
      state.isLoading = false;
      state.avilableNumbers = action.payload || [];
      state.error = null;
    },
    fetchNumberssuccess(state, action) {
      state.numbers = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {},
});

export function getAvailableNumber(params: any = {}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoadind());
    try {
      const response: ApiResponseType = await axiosInstance.get(
        NumberApiUrl.availableNumber,
        {
          params: params,
        }
      );
      if (response?.statusCode === 200 && response?.status === "success") {
        dispatch(slice.actions.getSearchNumberSuccess(response.data));
      } else {
        dispatch(
          slice.actions.updateNumberState({ key: "avilableNumbers", value: [] })
        );
      }
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));

      return error;
    }
  };
}

export const getUserActiveSubcription = () => {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoadind());
    try {
      const response: ApiResponseType = await axiosInstance.get(
        NumberApiUrl.activeSubcription
      );
      if (response?.statusCode === 200 && response?.status === "success") {
        dispatch(
          slice.actions.updateNumberState({
            key: "activeSubscription",
            value: response.data,
          })
        );
      } else {
        dispatch(
          slice.actions.updateNumberState({
            key: "activeSubscription",
            value: null,
          })
        );
      }
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
export const fetchNumbers = (params?: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoadind());
    try {
      const response: ApiResponseType = await axiosInstance.get(
        NumberApiUrl.getNumbers,
        { params }
      );
      if (response?.statusCode === 200 && response?.status === "success") {
        dispatch(slice.actions.fetchNumberssuccess(response.data));
      } else {
        dispatch(
          slice.actions.updateNumberState({ key: "avilableNumbers", value: [] })
        );
      }
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const deleteNumber = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: ApiResponseType = await axiosInstance.delete(
        NumberApiUrl.deleteUser(id)
      );

      return response;
    } catch (error) {
      return error;
    }
  };
};

export const releaseNumber = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response: ApiResponseType = await axiosInstance.post(
        NumberApiUrl.releaseNumber(id)
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
export const { updateNumberState } = slice.actions;

export default slice.reducer;
