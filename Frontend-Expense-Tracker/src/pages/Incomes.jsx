import React, { useEffect, useState } from 'react';
import { getIncomes, addIncome, deleteIncome } from '../services/transactionService';
import TransactionTable from '../features/transactions/TransactionTable';
import IncomeForm from '../features/transactions/IncomeForm';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, X, Filter } from 'lucide-react';

const Incomes = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [source, setSource] = useState('');
    const [sortBy, setSortBy] = useState('date,desc');

    const sources = ['SALARY', 'INVESTMENT', 'TRADING'];

    const fetchIncomes = async () => {
        setLoading(true);
        try {
            const params = {
                page: 0,
                size: 50,
                sort: sortBy,
            };

            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (source) params.source = source;

            const data = await getIncomes(params);
            setIncomes(data.content || []);
        } catch (err) {
            setError('Failed to load incomes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, [startDate, endDate, source, sortBy]);

    const handleCreate = async (formData) => {
        try {
            await addIncome(formData);
            setShowForm(false);
            fetchIncomes(); // Refresh list
        } catch (err) {
            alert('Failed to add income');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this income?')) return;
        try {
            await deleteIncome(id);
            fetchIncomes(); // Refresh list
        } catch (err) {
            alert('Failed to delete income');
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Incomes</h1>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Income
                    </Button>
                )}
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">New Income</h2>
                        <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <IncomeForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
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
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                        >
                            <option value="">All Sources</option>
                            {sources.map(s => (
                                <option key={s} value={s}>{s}</option>
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

                {(startDate || endDate || source) && (
                    <Button variant="ghost" onClick={() => { setStartDate(''); setEndDate(''); setSource(''); setSortBy('date,desc'); }} className="text-xs">
                        Clear
                    </Button>
                )}
            </div>

            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className={loading ? 'opacity-50' : ''}>
                    <TransactionTable
                        transactions={incomes}
                        onDelete={handleDelete}
                        type="income"
                    />
                </div>
            )}
        </div>
    );
};

export default Incomes;
