import api from '../api/axios';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
};
