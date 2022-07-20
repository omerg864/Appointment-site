import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingsService from "./settingsService";


const initialState = {
    settings: {
        site_description: "",
        register_code: "",
        schedule: [],
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};


export const getSiteSettings = createAsyncThunk("settings/getSiteSettings", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await settingsService.getSiteSettings(token);
        return response.data;
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});


export const getManagerSettings = createAsyncThunk("settings/getManagerSettings", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await settingsService.getManagerSettings(token);
        return response.data;
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});


export const updateSettings = createAsyncThunk("settings/updateSettings", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await settingsService.updateSettings(token, data);
        return response.data;
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});


export const settingsSlice = createSlice({
    name: "settings",
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
        builder.addCase(getSiteSettings.pending, (state, action) => {
            state.isLoading = true;
        }
        );
        builder.addCase(getSiteSettings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.settings = action.payload.settings;
        }
        );
        builder.addCase(getSiteSettings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        }
        );
        builder.addCase(getManagerSettings.pending, (state, action) => {
            state.isLoading = true;
        }
        );
        builder.addCase(getManagerSettings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.settings = action.payload.settings;
        }
        );
        builder.addCase(getManagerSettings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        }
        );
        builder.addCase(updateSettings.pending, (state, action) => {
            state.isLoading = true;
        }
        );
        builder.addCase(updateSettings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.settings = action.payload.settings;
        }
        );
        builder.addCase(updateSettings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        }
        );
    }
});


export const { reset } = settingsSlice.actions;
export default settingsSlice.reducer;