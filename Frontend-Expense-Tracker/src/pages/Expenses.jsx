import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense, deleteExpense } from '../services/transactionService';
import TransactionTable from '../features/transactions/TransactionTable';
import ExpenseForm from '../features/transactions/ExpenseForm';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, X, Filter } from 'lucide-react';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('date,desc');

    const categories = ['PERSONAL', 'SURVIVAL_LIVELIHOOD', 'INVESTMENT'];

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const params = {
                page: 0,
                size: 50, // Fetch more items for now
                sort: sortBy,
            };

            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (category) params.category = category;

            const data = await getExpenses(params);
            setExpenses(data.content || []);
        } catch (err) {
            setError('Failed to load expenses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [startDate, endDate, category, sortBy]); // Refetch when filters change

    const handleCreate = async (formData) => {
        try {
            await addExpense(formData);
            setShowForm(false);
            fetchExpenses();
        } catch (err) {
            alert('Failed to add expense');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this expense?')) return;
        try {
            await deleteExpense(id);
            fetchExpenses();
        } catch (err) {
            alert('Failed to delete expense');
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Expense
                    </Button>
                )}
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">New Expense</h2>
                        <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <ExpenseForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
                </div>
            )}

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end md:items-center">
                <div className="flex items-center gap-2 text-gray-500 mb-2 md:mb-0">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filters:</span>
                </div>

                <div className="grid grid-cols-2 md:flex gap-3 flex-1 w-full">
                    <div className="w-full md:w-auto">
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Start Date"
                            className="text-xs"
                        />
                    </div>
                    <div className="w-full md:w-auto">
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="End Date"
                            className="text-xs"
                        />
                    </div>
                    <div className="w-full md:w-40">
                        <select
                            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => (
                                <option key={c} value={c}>{c.replace('_', ' / ')}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-40">
                        <select
                            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date,desc">Date (Newest)</option>
                            <option value="date,asc">Date (Oldest)</option>
                            <option value="amount,desc">Amount (High-Low)</option>
                            <option value="amount,asc">Amount (Low-High)</option>
                        </select>
                    </div>
                </div>

                {(startDate || endDate || category) && (
                    <Button variant="ghost" onClick={() => { setStartDate(''); setEndDate(''); setCategory(''); setSortBy('date,desc'); }} className="text-xs">
                        Clear
                    </Button>
                )}
            </div>

            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className={loading ? 'opacity-50' : ''}>
                    <TransactionTable
                        transactions={expenses}
                        onDelete={handleDelete}
                        type="expense"
                    />
                </div>
            )}
        </div>
    );
};

export default Expenses;
