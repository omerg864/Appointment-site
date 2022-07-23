import axios from 'axios';
import {toast} from 'react-toastify';
import { toDate, formatUrlDate } from '../../functions/dateFunctions';

const API_URL = '/api/v1/days/';


const getDayAppointments = async (token, date) => {
    const response = await axios.get(API_URL + 'getDay/' + date, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const getFreeDayAppointments = async (token, date) => {
    const response = await axios.get(API_URL + 'getFreeDay/' + date, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const bookAppointment = async (token, data) => {
    const response = await axios.post(API_URL + 'book', data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const getUserAppointments = async (token) => {
    const response = await axios.get(API_URL + 'getMyAppointments', {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const updateAppointment = async (token, data) => {
    const response = await axios.put(API_URL + 'updateAppointment', data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const deleteAppointment = async (token, data) => {
    const response = await axios.delete(API_URL + 'deleteAppointment' + `/${data.date}/${data.time}`, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const deleteAppointmentStaff = async (token, data) => {
    const response = await axios.delete(API_URL + 'deleteAppointmentStaff' + `/${data.date}/${data.time}`, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const addBreak = async (token, data) => {
    const response = await axios.post(API_URL + 'addBreak', data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const updateBreak = async (token, data) => {
    const response = await axios.put(API_URL + 'updateBreak', data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const deleteBreak = async (token, data) => {
    const response = await axios.delete(API_URL + 'deleteBreak' + `/${data.date}/${data.time}`, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const updateDay = async (token, data) => {
    const response = await axios.put(API_URL + 'updateDay' + `/${formatUrlDate(toDate(data.date))}`, data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const dayService = {
    getDayAppointments,
    getFreeDayAppointments,
    bookAppointment,
    getUserAppointments,
    updateAppointment,
    deleteAppointment,
    addBreak,
    updateBreak,
    deleteBreak,
    updateDay,
    deleteAppointmentStaff
}

export default dayService;