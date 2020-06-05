import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.4.101:3001/"
});

export default api;