import React from 'react';
import { Trash2 } from 'lucide-react';
import Button from '../../components/Button';
import { format } from 'date-fns';

const TransactionTable = ({ transactions, onView, onDelete, type }) => {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-100">
                No {type}s found. Add one to get started!
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">{type === 'expense' ? 'Category' : 'Source'}</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {transaction.date ? format(new Date(transaction.date), 'MMM dd, yyyy') : '-'}
                                </td>
                                <td className="px-6 py-4">{transaction.description}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                        {type === 'expense' ? transaction.category : transaction.source}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-medium ${type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                                    {type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => onDelete(transaction.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionTable;
