import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { clsx } from 'clsx';

const StatCard = ({ title, amount, icon: Icon, type }) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className={clsx("text-2xl font-bold mt-1", {
                        "text-green-600": type === 'income',
                        "text-red-600": type === 'expense',
                        "text-blue-600": type === 'balance',
                    })}>
                        {formattedAmount}
                    </p>
                </div>
                <div className={clsx("p-3 rounded-full", {
                    "bg-green-100 text-green-600": type === 'income',
                    "bg-red-100 text-red-600": type === 'expense',
                    "bg-blue-100 text-blue-600": type === 'balance',
                })}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

const DashboardStats = ({ data }) => {
    if (!data) return null;
    // backend keys: totalIncome, totalExpense, balance (assumed based on PnL concept)
    const { totalIncome = 0, totalExpense = 0, balance = 0 } = data;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Total Income"
                amount={totalIncome}
                icon={ArrowUpCircle}
                type="income"
            />
            <StatCard
                title="Total Expense"
                amount={totalExpense}
                icon={ArrowDownCircle}
                type="expense"
            />
            <StatCard
                title="Net Balance"
                amount={balance}
                icon={Wallet}
                type="balance"
            />
        </div>
    );
};

export default DashboardStats;
