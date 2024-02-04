import { createSlice } from "@reduxjs/toolkit";


interface UserStateType{
   users:any[]
   isLoading:boolean
    accessToken:string,
  refreshToken:string

}
const initialState:UserStateType= {
  users: [],
  isLoading: false,
  accessToken:"",
  refreshToken:''
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
});

export const {
 updateUserState
} = slice.actions;

export default slice.reducer;
