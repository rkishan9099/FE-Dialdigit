import axiosInstance from "@/Utils/axios";
import { getUser } from "@/actions/userActions";
import { NumberApiUrl, RolesApiUrl, UserApiUrl } from "@/configs/apiUrlConstant";
import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserStateType {
  numbers: any[];
  isLoading: boolean;
  avilableNumbers:any[];
  error:any

}
const initialState: UserStateType = {
  numbers: [],
  isLoading: false,
  avilableNumbers:[],
  error:null
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
    getSearchNumberSuccess(state, action) {
      state.isLoading = false;
      state.avilableNumbers = action.payload || [];
      state.error = null;
    },
  }
});

export function getAvailableNumber(params: any = {}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoadind());
    try {
      const response = await axiosInstance.get(NumberApiUrl.availableNumber,{params:params});
      dispatch(slice.actions.getSearchNumberSuccess(response.data));

      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));

      return error;
    }
  };
}


export const { updateUserState } = slice.actions;

export default slice.reducer;
