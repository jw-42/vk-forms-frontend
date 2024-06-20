import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";

export interface ConfigState {
  isInit?: boolean,
  isSecure?: boolean,
  accessToken: string,
  launchParams?: GetLaunchParamsResponse
}

const initialState: ConfigState = {
  isInit: undefined,
  isSecure: undefined,
  accessToken: "",
  launchParams: undefined
}

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload
    },
    setSecure: (state, action: PayloadAction<boolean>) => {
      state.isSecure = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setLaunchParams: (state, action: PayloadAction<GetLaunchParamsResponse>) => {
      state.launchParams = action.payload
    }
  }
});

export const { setInit, setSecure, setAccessToken, setLaunchParams } = configSlice.actions

export default configSlice.reducer