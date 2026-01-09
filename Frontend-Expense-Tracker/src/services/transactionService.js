import api from '../api/axios';

// Expenses
export const getExpenses = async (params) => {
    const response = await api.get('/expenses', { params });
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
};

export const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
};

// Incomes
export const getIncomes = async (params) => {
    const response = await api.get('/incomes', { params });
    return response.data;
};

export const addIncome = async (incomeData) => {
    const response = await api.post('/incomes', incomeData);
    return response.data;
};

export const deleteIncome = async (id) => {
    await api.delete(`/incomes/${id}`);
};
