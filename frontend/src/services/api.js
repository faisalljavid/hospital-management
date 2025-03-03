import axios from 'axios';

const API_URL = 'https://hospital-management-backend-0ye7.onrender.com/api/v1';
export const api = axios.create({
    baseURL: API_URL
});

export const createHospital = async (hospitalData) => {
    return await axios.post(`${API_URL}/create`, hospitalData);
};

export const getHospitalsByCity = async (city) => {
    return await axios.get(`${API_URL}/?city=${city}`);
};

export const deleteHospital = async (id) => {
    return await axios.delete(`${API_URL}/delete?id=${id}`);
};

export const updateHospital = async (id, updateData) => {
    return await axios.put(`${API_URL}/update?id=${id}`, updateData);
};

export const addHospitalDetails = async (id, detailsData) => {
    return await axios.post(`${API_URL}/details?id=${id}`, detailsData);
};