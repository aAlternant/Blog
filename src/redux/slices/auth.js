import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('/auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegistration = createAsyncThunk('/auth/fetchRegistration', async (params) => {
  const { data } = await axios.post('/auth/registration', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state, actions) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, actions) => {
      state.status = 'loaded';
      state.data = actions.payload;
    },
    [fetchUserData.rejected]: (state, actions) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthMe.pending]: (state, actions) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, actions) => {
      state.status = 'loaded';
      state.data = actions.payload;
    },
    [fetchAuthMe.rejected]: (state, actions) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegistration.pending]: (state, actions) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegistration.fulfilled]: (state, actions) => {
      state.status = 'loaded';
      state.data = actions.payload;
    },
    [fetchRegistration.rejected]: (state, actions) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectorIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
