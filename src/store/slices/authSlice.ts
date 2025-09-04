/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/lib/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface IUser {
  name: string | null;
  email: string | null;
  id: string | number | null;
  surname?:string | null;
  is_admin?:boolean;
  is_blocked?:boolean;
}

interface UserState {
  user: IUser | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}

// Початковий стан
const initialState: UserState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
};

// Асинхронний thunk для логіну
export const loginUser = createAsyncThunk<
  IUser, // результат
  { email: string; password: string }, // аргументи
  { rejectValue: string } // тип помилки
>("user/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data as IUser;
  } catch (error: any) {
    // типізований парсинг помилки (приклад)
    let errorMessage = "Failed to login";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.message || error.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = { name: null, email: null, id: null,surname:null };
      state.loggedIn = false;
      state.error = null;
      state.loading = false;
    },
    setUserRedux(state, action: PayloadAction<IUser>) {
    state.user = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { logout,setUserRedux } = userSlice.actions;
export default userSlice.reducer;
