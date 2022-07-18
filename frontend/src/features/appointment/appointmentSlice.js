import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";


const initialState = {
    appointments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const getAppointments = createAsyncThunk("appointment/get", async (date, thunkAPI) => {
    try{
        const response =  await appointmentService.getAppointments(date);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});


export const appointmentSlice = createSlice({
    name: "appointment",
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
        builder.addCase(getAppointments.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.appointments = action.payload.appointments;
        });
        builder.addCase(getAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
    }
});


export const { reset } = appointmentSlice.actions;
export default  appointmentSlice.reducer;