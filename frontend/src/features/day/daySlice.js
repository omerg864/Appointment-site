import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayService from "./dayService";


const initialState = {
    day: {
        date: "",
        appointments: []
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const register = createAsyncThunk("day/get", async (date, thunkAPI) => {
    try{
        const response =  await dayService.getDay(date);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});


export const daySlice = createSlice({
    name: "day",
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
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = action.payload.day;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
    }
});

export const { reset } = daySlice.actions;
export default  daySlice.reducer;