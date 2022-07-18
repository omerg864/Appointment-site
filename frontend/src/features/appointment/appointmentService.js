import axios from "axios";
import { toast } from "react-toastify";


const API_URL = "/api/v1/appointments/";

const getAppointments = async (date) => {
    const response = await axios.get(API_URL + 'get/' + date);
    return response;
}

const appointmentService = {
    getAppointments
}

export default appointmentService;