import axios from 'axios';

const API_URL = 'http://localhost:5118/HealthHistory'; 
const API_URL_USERCREDENTIAL = 'http://localhost:5118/UserCredential'; 
const API_URL_HEALTHHISTORYCHANGE = 'http://localhost:5118/healthHistoryChange';


export const getHealthHistories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching health histories:', error);
        throw error;
    }
};

export const getHealthHistoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching health history by ID:', error);
        throw error;
    }
};

export const addHealthHistory = async (newHistory) => {
    try {        
        const response = await axios.post(API_URL, newHistory);        
        return response.data;
    } catch (error) {
        console.error('Error adding health history:', error);
        throw error;
    }
};

export const updateHealthHistory = async (id, updatedHistory) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedHistory);
        return response.data;
    } catch (error) {
        console.error('Error updating health history:', error);
        throw error;
    }
};

export const deleteHealthHistory = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting health history:', error);
        throw error;
    }
};

export const addUserCredential = async (newUser) => {
    try {
        console.error(newUser);
        const response = await axios.post(API_URL_USERCREDENTIAL, newUser);
        return response.data;
    } catch (error) {
        console.error('Error adding User:', error);
        throw error;
    }
};

export const validateUserCredential = async (newUser) => {
    try {
        console.error(newUser);
        const response = await axios.post((`${API_URL_USERCREDENTIAL}/validate`), newUser);
        return response.data;
    } catch (error) {
        console.error('Error adding User:', error);
        throw error;
    }
};

export const getHealthHistoryChanges = async () => {
    try {
        const response = await axios.get(API_URL_HEALTHHISTORYCHANGE);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching health history changes:', error);
        throw error;
    }
};

export const getHealthHistoryChangeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL_HEALTHHISTORYCHANGE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching health history Changes by ID:', error);
        throw error;
    }
};

