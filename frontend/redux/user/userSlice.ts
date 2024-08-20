import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAuthState(state) {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, resetAuthState } =
  userSlice.actions;

export default userSlice.reducer;
