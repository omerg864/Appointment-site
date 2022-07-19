import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL = '/api/v1/settings/';

const headers = (token) => { 
    return {
    headers: {
        Authorization: `Bearer ${token}`,
        accepts: 'application/json'
    }
    }
}


const getSiteSettings = async (token) => {
    const response = await axios.get(API_URL + 'getSiteSettings', headers(token));
    return response;
}

const getManagerSettings = async (token) => {
    const response = await axios.get(API_URL + 'getManagerSettings', headers(token));
    return response;
}

const updateSettings = async (token, data) => {
    const response = await axios.put(API_URL + 'updateSettings/', data, headers(token));
    return response;
}


const settingsService = {
    getSiteSettings,
    getManagerSettings,
    updateSettings
}

export default settingsService;