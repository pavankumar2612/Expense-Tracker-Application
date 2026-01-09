import api from '../api/axios';

export const getPnL = async () => {
    const response = await api.get('/report/pnl');
    return response.data;
};
