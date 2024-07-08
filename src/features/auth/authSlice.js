import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {auth} from '../../shared/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword} from 'firebase/auth';

const getUserData = (user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return getUserData(userCredential.user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return getUserData(userCredential.user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
    async ({ newPassword }, { getState, rejectWithValue }) => {
        const state = getState();
        const currentError = state.auth.emailUpdateError;

        if (currentError) {
            return rejectWithValue(currentError);
        }
        
        try {
            const user = auth.currentUser;
            await updatePassword(user, newPassword);
            return { newPassword };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, status: null, error: null, emailUpdateError: null},
    reducers: {
        logout: (state) => {
            state.user = null;
        },

        resetAuthStatus: (state) => {
            state.status = 'idle';
            state.error = null;
            state.emailUpdateError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
              })
              .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
              .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
              })
              .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
              .addCase(updateUserEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload.newEmail;
                state.error = null;
                state.emailUpdateError = null;
            })
            .addCase(updateUserEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.emailUpdateError = action.payload;
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
})

export const { logout, resetAuthStatus } = authSlice.actions;

export default authSlice.reducer;