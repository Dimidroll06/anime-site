import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuth: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('token');
        },
    },
});

export const getAuth = (state) => state.auth.isAuth;
export const getUser = (state) => state.auth.user;
export const getLoading = (state) => state.auth.isLoading;

export const { setAuth, setUser, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;