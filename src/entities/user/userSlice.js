import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../shared/lib/firebase';
import { updateEmail, updatePassword } from 'firebase/auth';

export const updateUserEmail = createAsyncThunk(
    'user/updateUserEmail',
    async ({ newEmail }, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            await updateEmail(user, newEmail);
            return { newEmail };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'user/updateUserPassword',
    async ({ newPassword }, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            await updatePassword(user, newPassword);
            return { newPassword };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: { email: null, status: null, error: null },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.email = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload.newEmail;
            })
            .addCase(updateUserEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
