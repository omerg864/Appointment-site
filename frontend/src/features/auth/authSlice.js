import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null ,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try{
        const response =  await authService.register(user);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try{
        const response =  await authService.login(user);
        return response.data;
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try{
        await authService.logout();
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await authService.getUser(token);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const updateUser = createAsyncThunk("auth/updateUser", async (user, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await authService.updateUser(token, user);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await authService.deleteUser(token, id);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const updateUserPassword = createAsyncThunk("auth/updateUserPassword", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await authService.updateUserPassword(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const getUsers = createAsyncThunk("auth/getUsers", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await authService.getUsers(token);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        }
        );
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = null;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            if (action.payload.staff) {
                state.users = state.users.filter(user => user.id !== action.payload.user.id).push(action.payload.user);
            } else {
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            }
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = state.users.filter(user => user.id !== action.payload.user.id);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(updateUserPassword.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(updateUserPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload.users;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
    }
});

export const { reset } = authSlice.actions;
export default  authSlice.reducer;