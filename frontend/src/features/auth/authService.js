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

const authService = {
    register,
    login,
    logout
}

export default authService;