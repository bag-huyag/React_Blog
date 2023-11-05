/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../Api/Api';

export const createAccount = createAsyncThunk('account/createAccount', async (newUser, { rejectWithValue }) => {
    try {
        const data = await api.createNewUserAccount(newUser);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const loginAccount = createAsyncThunk('account/loginAccount', async (loginData, { rejectWithValue }) => {
    try {
        const data = await api.login(loginData);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const logout = createAsyncThunk('account/logout', () => {
    api.logOut();
    return true;
});

export const getCurrentUser = createAsyncThunk('account/getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const data = await api.getCurrentUser();
        return data;
    } catch (error) {
        return rejectWithValue(`${error}`);
    }
});

export const editAccount = createAsyncThunk('account/editAccount', async (newUserData, { rejectWithValue }) => {
    try {
        const data = await api.editUserAccount(newUserData);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    user: {
        username: '',
        email: '',
        image: '',
    },
    isLogin: false,
    isLoading: false,
    isEditUserSuccess: false,
    isCurentUserLoading: true,
    errors: null,
};

export const userSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        clearServerErrors: (state) => {
            state.errors = null;
        },
        clearIsEditUserSuccess: (state) => {
            state.isEditUserSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.errors = null;
            state.isLoading = true;
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            const { username, email, image: img } = action.payload.user;
            state.user = {
                username,
                email,
                image: img || '',
            };
            state.isLoading = false;
            state.isLogin = true;
        });
        builder.addCase(createAccount.rejected, (state, { payload }) => {
            state.errors = payload;
            state.isLoading = false;
        });

        builder.addCase(editAccount.pending, (state) => {
            state.errors = null;
            state.isLoading = true;
            state.isEditUserSuccess = false;
        });
        builder.addCase(editAccount.fulfilled, (state, action) => {
            const { username, email, image: img } = action.payload.user;
            state.user = {
                username,
                email,
                image: img || '',
            };
            state.isLoading = false;
            state.isLogin = true;
            state.isEditUserSuccess = true;
        });
        builder.addCase(editAccount.rejected, (state, { payload }) => {
            state.errors = payload;
            state.isLoading = false;
            state.isEditUserSuccess = false;
        });

        builder.addCase(loginAccount.pending, (state) => {
            state.errors = null;
            state.isLoading = true;
        });
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            const { username, email, image: img } = action.payload.user;
            state.user = {
                username,
                email,
                image: img || '',
            };
            state.isLoading = false;
            state.isLogin = true;
        });
        builder.addCase(loginAccount.rejected, (state, { payload }) => {
            state.errors = payload;
            state.isLoading = false;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.isLogin = false;
            state.user = {
                username: '',
                email: '',
                image: '',
            };
        });

        builder.addCase(getCurrentUser.pending, (state) => {
            state.isCurentUserLoading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            const { username, email, image: img } = action.payload.user;
            state.user = {
                username,
                email,
                image: img || '',
            };
            state.isCurentUserLoading = false;
            state.isLogin = true;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.isCurentUserLoading = false;
        });
    },
});

export const { clearServerErrors, clearIsEditUserSuccess } = userSlice.actions;

export const selectServerErrors = (state) => state.account.errors;
export const selectIsLoading = (state) => state.account.isLoading;
export const selectUser = (state) => state.account.user;
export const selectIsLogin = (state) => state.account.isLogin;
export const selectIsCurentUserLoading = (state) => state.account.isCurentUserLoading;
export const selectIsEditUserSuccess = (state) => state.account.isEditUserSuccess;

export default userSlice.reducer;
