import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {auth} from '../../shared/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const getUserData = (user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

// export const registerUser = createAsyncThunk(
//     'auth/registerUser',
//     async ({email, password}, {rejectWithValue}) => {
//         try {
//             await createUserWithEmailAndPassword(email, password);
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

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


// export const loginUser = createAsyncThunk(
//     'auth/loginUser',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             return userCredential.user;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, status: null, error: null},
    reducers: {
        logout: (state) => {
            state.user = null;
        },
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
              });
    },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;