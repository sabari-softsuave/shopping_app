import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload; // payload should be serializable user info
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        setUser: (state, action) => {
            // Helper to just set user without affecting loading state necessarily,
            // but loginSuccess usually handles this. We'll keep it simple.
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
        },
        updateUserProfile: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
