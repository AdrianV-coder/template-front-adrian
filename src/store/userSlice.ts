import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getUserByUsername } from '../services/apiService';

interface AuthUser {
  id: number;
  username: string;
  email?: string;
}

interface UserState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const storedUser = localStorage.getItem('authUser');

const initialState: UserState = {
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<AuthUser, string, { rejectValue: string }>(
  'user/loginUser',
  async (username, { rejectWithValue }) => {
    try {
      const userData = await getUserByUsername(username);

      if (!userData || userData.username !== username) {
        return rejectWithValue('Usuario no encontrado');
      }

      return {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      };
    } catch {
      return rejectWithValue('Error al iniciar sesión');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('authUser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('authUser', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Error al iniciar sesión';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;