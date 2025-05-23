import React, { useState, useEffect } from 'react';
import { Users, FileText, CreditCard, DollarSign, TrendingUp, Calendar, Filter } from 'lucide-react';

const DashboardSumary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [animateCards, setAnimateCards] = useState(false);

  // Mock data - replace with your actual data
  const dashboardData = {
    users: {
      total: 12547,
      growth: 12.5,
      newThisMonth: 1250
    },
    policyRequests: {
      total: 8934,
      pending: 234,
      approved: 8345,
      rejected: 355,
      growth: 8.3
    },
    transactions: {
      total: 45678,
      products: [
        { name: 'Health Insurance', count: 15234, amount: 2840000 },
        { name: 'Auto Insurance', count: 12456, amount: 1950000 },
        { name: 'Life Insurance', count: 9876, amount: 3200000 },
        { name: 'Home Insurance', count: 8112, amount: 1680000 }
      ],
      growth: 15.7
    },
    totalEarnings: {
      amount: 9670000,
      growth: 22.4,
      thisMonth: 1240000
    }
  };

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const formatCurrency = (amount:any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num:any) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Monitor your business metrics and performance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-medium"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${animateCards ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center text-green-500 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{dashboardData.users.growth}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(dashboardData.users.total)}</h3>
          <p className="text-gray-600 text-sm mb-2">Total Users</p>
          <div className="bg-blue-50 rounded-lg p-2 text-xs text-blue-700">
            +{formatNumber(dashboardData.users.newThisMonth)} new this month
          </div>
        </div>

        {/* Policy Requests Card */}
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${animateCards ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center text-green-500 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{dashboardData.policyRequests.growth}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(dashboardData.policyRequests.total)}</h3>
          <p className="text-gray-600 text-sm mb-3">Policy Requests</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-yellow-600">Pending: {dashboardData.policyRequests.pending}</span>
              <span className="text-green-600">Approved: {dashboardData.policyRequests.approved}</span>
            </div>
          </div>
        </div>

        {/* Transactions Card */}
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${animateCards ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <CreditCard className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex items-center text-green-500 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{dashboardData.transactions.growth}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(dashboardData.transactions.total)}</h3>
          <p className="text-gray-600 text-sm mb-2">Total Transactions</p>
          <div className="bg-emerald-50 rounded-lg p-2 text-xs text-emerald-700">
            Across all products
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${animateCards ? 'animate-fadeIn' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex items-center text-green-500 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{dashboardData.totalEarnings.growth}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(dashboardData.totalEarnings.amount)}</h3>
          <p className="text-gray-600 text-sm mb-2">Total Earnings</p>
          <div className="bg-amber-50 rounded-lg p-2 text-xs text-amber-700">
            {formatCurrency(dashboardData.totalEarnings.thisMonth)} this month
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Transactions Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Product Performance</h2>
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {dashboardData.transactions.products.map((product, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-sm font-medium text-green-600">{formatCurrency(product.amount)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{formatNumber(product.count)} transactions</span>
                  <span>Avg: {formatCurrency(product.amount / product.count)}</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(product.amount / Math.max(...dashboardData.transactions.products.map(p => p.amount))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Status Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Policy Status Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <p className="font-semibold text-green-800">Approved Policies</p>
                <p className="text-sm text-green-600">Ready for activation</p>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {formatNumber(dashboardData.policyRequests.approved)}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <div>
                <p className="font-semibold text-yellow-800">Pending Review</p>
                <p className="text-sm text-yellow-600">Awaiting approval</p>
              </div>
              <div className="text-2xl font-bold text-yellow-700">
                {formatNumber(dashboardData.policyRequests.pending)}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div>
                <p className="font-semibold text-red-800">Rejected</p>
                <p className="text-sm text-red-600">Requires attention</p>
              </div>
              <div className="text-2xl font-bold text-red-700">
                {formatNumber(dashboardData.policyRequests.rejected)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardSumary;