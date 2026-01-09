import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Wallet, TrendingUp, TrendingDown, LogOut, PieChart } from 'lucide-react';
import { clsx } from 'clsx';

const Layout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/expenses', label: 'Expenses', icon: TrendingDown },
        { to: '/incomes', label: 'Incomes', icon: TrendingUp },
        { to: '/reports', label: 'Reports', icon: PieChart }, // Future placeholder
    ];

    return (
        <div className="flex h-screen bg-green-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-4 border-b flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">ExpenseTracker</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                clsx(
                                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <div className="mb-4 px-3">
                        <p className="text-xs text-gray-500 uppercase">Logged in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.email || 'User'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
