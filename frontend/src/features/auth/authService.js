import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL = '/api/v1/users/';


const register = async (user) => {
    const response = await axios.post(API_URL + 'register', user);
    return response;
}

const login = async (user) => {
    const response = await axios.post(API_URL + 'login', user);
    return response;
}

const logout = async () => {
    localStorage.removeItem('user');
}

const getUser = async (token) => {
    const response = await axios.get(API_URL + 'get', {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const updateUser = async (token, data) => {
    const response = await axios.put(API_URL + 'updateUser', data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const deleteUser = async (token, id) => {
    const response = await axios.delete(API_URL + 'deleteUser/' + `${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const updateUserPassword = async (token, data) => {
    const response = await axios.put(API_URL + 'updatePassword', data, {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const getUsers = async (token) => {
    const response = await axios.get(API_URL + 'getUsers', {headers: {Authorization: `Bearer ${token}`}});
    return response;
}

const authService = {
    register,
    login,
    logout,
    getUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    getUsers
}

export default authService;