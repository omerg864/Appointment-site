import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayService from "./dayService";


const initialState = {
    day: {
        date: "",
        appointments: []
    },
    appointments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const getDayAppointments = createAsyncThunk("day/getDayAppointments", async (date, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.getDayAppointments(token, date);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const getFreeDayAppointments = createAsyncThunk("day/getFreeDayAppointments", async (date, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.getFreeDayAppointments(token, date);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const bookAppointment = createAsyncThunk("day/bookAppointment", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.bookAppointment(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const getUserAppointments = createAsyncThunk("day/getUserAppointments", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.getUserAppointments(token);
        return response.data;
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const updateAppointment = createAsyncThunk("day/updateAppointment", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.updateAppointment(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const deleteAppointment = createAsyncThunk("day/deleteAppointment", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.deleteAppointment(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const deleteAppointmentStaff = createAsyncThunk("day/deleteAppointmentStaff", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.deleteAppointmentStaff(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const addBreak = createAsyncThunk("day/addBreak", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.addBreak(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const updateBreak = createAsyncThunk("day/updateBreak", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.updateBreak(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const deleteBreak = createAsyncThunk("day/deleteBreak", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.deleteBreak(token, data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});


export const updateDay = createAsyncThunk("day/updateDay", async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        const response =  await dayService.updateDay(token, data);
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
        builder.addCase(getDayAppointments.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getDayAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.day = {appointments: action.payload.day,  date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                breaks: action.payload.breaks, interval: action.payload.interval};
        });
        builder.addCase(getDayAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(getFreeDayAppointments.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getFreeDayAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: action.payload.free_appointments,  date: action.payload.date};
        });
        builder.addCase(getFreeDayAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(bookAppointment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(bookAppointment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            if (action.meta.arg.staff) {
                state.day = {appointments: action.payload.day, date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                    interval: action.payload.interval, breaks: action.payload.breaks};
            }
        });
        builder.addCase(bookAppointment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(getUserAppointments.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.appointments = action.payload.appointments;
        });
        builder.addCase(getUserAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(updateAppointment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateAppointment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: state.day.appointments.map(appoint => {
                if (appoint.type === 'appointment' && appoint._id === action.payload.appointment._id) {
                    console.log("in");
                    return action.payload.appointment;
                } else {
                    return appoint;
                }
            }), date: action.payload.date};
        });
        builder.addCase(updateAppointment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(deleteAppointmentStaff.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteAppointmentStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: action.payload.day, date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                interval: action.payload.interval, breaks: action.payload.breaks};
        });
        builder.addCase(deleteAppointmentStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(deleteAppointment.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteAppointment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.appointments = action.payload.appointments;
        });
        builder.addCase(deleteAppointment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(addBreak.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addBreak.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: action.payload.day, date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                interval: action.payload.interval, breaks: action.payload.breaks};
        });
        builder.addCase(addBreak.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(updateBreak.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateBreak.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: action.payload.day, date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                interval: action.payload.interval, breaks: action.payload.breaks};
        });
        builder.addCase(updateBreak.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(deleteBreak.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteBreak.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: action.payload.day, date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                interval: action.payload.interval, breaks: action.payload.breaks};
        });
        builder.addCase(deleteBreak.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
        builder.addCase(updateDay.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateDay.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.day = {appointments: action.payload.day, date: action.payload.date, start_time: action.payload.start_time, end_time: action.payload.end_time,
                interval: action.payload.interval, breaks: action.payload.breaks};
        });
        builder.addCase(updateDay.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        });
    }
});

export const { reset } = daySlice.actions;
export default  daySlice.reducer;