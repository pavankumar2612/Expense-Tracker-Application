import React, { useEffect, useState } from 'react';
import { getExpenses, getIncomes } from '../../services/transactionService';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch latest 5 of each
                const [expensesData, incomesData] = await Promise.all([
                    getExpenses({ page: 0, size: 5, sort: 'date,desc' }),
                    getIncomes({ page: 0, size: 5, sort: 'date,desc' })
                ]);

                const expenses = (expensesData.content || []).map(item => ({ ...item, type: 'expense' }));
                const incomes = (incomesData.content || []).map(item => ({ ...item, type: 'income' }));

                // Merge and sort
                const allTransactions = [...expenses, ...incomes].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });

                // Take top 5
                setTransactions(allTransactions.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch recent transactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-full">
                <p className="text-gray-400">No recent transactions</p>
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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div key={`${tx.type}-${tx.id}`} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}
                            >
                                {tx.type === 'income' ? (
                                    <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                    <ArrowDownLeft className="h-4 w-4" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                                <p className="text-xs text-gray-500">
                                    {format(new Date(tx.date), 'MMM dd, yyyy')} • {tx.type === 'income' ? tx.source : tx.category}
                                </p>
                            </div>
                        </div>
                        <p
                            className={`text-sm font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
