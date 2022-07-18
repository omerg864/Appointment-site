import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL = '/api/v1/days/';


const getDay = async (date) => {
    const response = await axios.get(API_URL + 'get/' + date);
    return response;
}

const dayService = {
    getDay
}

export default dayService;