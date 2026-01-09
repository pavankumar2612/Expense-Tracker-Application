import React, { useEffect, useState } from 'react';
import { getPnL } from '../services/reportService';
import DashboardStats from '../features/dashboard/DashboardStats';
import IncomeExpenseChart from '../features/dashboard/IncomeExpenseChart';
import RecentTransactions from '../features/dashboard/RecentTransactions';

const Dashboard = () => {
    const [pnlData, setPnlData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPnL();
                // Ensure data exists, even if 0
                setPnlData(data || { totalIncome: 0, totalExpense: 0, balance: 0 });
            } catch (err) {
                console.error(err);
                // Don't show full error UI for initial empty state, just log
                setError('Could not load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Overview of your finances</p>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <DashboardStats data={pnlData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IncomeExpenseChart
                    income={pnlData?.totalIncome || 0}
                    expense={pnlData?.totalExpense || 0}
                />
                <RecentTransactions />
            </div>
        </div>
    );
};

export default Dashboard;
