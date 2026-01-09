import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { X } from 'lucide-react';

const ExpenseForm = ({ onSubmit, onCancel, isLoading }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState('PERSONAL');

    const categories = ['PERSONAL', 'SURVIVAL_LIVELIHOOD', 'INVESTMENT'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            description,
            amount: parseFloat(amount),
            date: new Date(date).toISOString(), // Backend likely expects ISO string or date
            category
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <Input
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Grocery Shopping"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Amount</label>
                    <Input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(c => (
                            <option key={c} value={c}>{c.replace('_', ' / ')}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <Input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Add Expense'}
                </Button>
            </div>
        </form>
    );
};

export default ExpenseForm;
