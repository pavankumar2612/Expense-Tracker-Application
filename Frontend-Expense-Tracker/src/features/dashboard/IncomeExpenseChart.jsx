import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const IncomeExpenseChart = ({ income, expense }) => {
    const data = [
        { name: 'Income', value: income },
        { name: 'Expense', value: expense },
    ];

    const COLORS = ['#10B981', '#EF4444']; // Emerald-500, Red-500

    // Don't render if no data
    if (!income && !expense) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-80">
                <p className="text-gray-400">No data available to display</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expense</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
