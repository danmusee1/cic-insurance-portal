import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, CreditCard, Calendar, DollarSign, Package, User, ChevronDown, ChevronUp } from 'lucide-react';

const PaymentListing = () => {
  // Sample payment data
  type Payment = {
    id: string;
    productName: string;
    customerName: string;
    customerEmail: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    cardLast4: string | null;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
    transactionId: string;
    date: string;
    gateway: string;
  };

  const [payments] = useState<Payment[]>([
    {
      id: 'PAY-001',
      productName: 'Premium Subscription',
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      amount: 99.99,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      cardLast4: '4242',
      status: 'completed',
      transactionId: 'txn_1234567890',
      date: '2024-01-15',
      gateway: 'Stripe'
    },
    {
      id: 'PAY-002',
      productName: 'Basic Plan',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@email.com',
      amount: 29.99,
      currency: 'USD',
      paymentMethod: 'PayPal',
      cardLast4: null,
      status: 'completed',
      transactionId: 'txn_0987654321',
      date: '2024-01-14',
      gateway: 'PayPal'
    },
    {
      id: 'PAY-003',
      productName: 'Enterprise License',
      customerName: 'Bob Johnson',
      customerEmail: 'bob.johnson@company.com',
      amount: 499.99,
      currency: 'USD',
      paymentMethod: 'Bank Transfer',
      cardLast4: null,
      status: 'pending',
      transactionId: 'txn_1122334455',
      date: '2024-01-13',
      gateway: 'Bank'
    },
    {
      id: 'PAY-004',
      productName: 'Pro Features',
      customerName: 'Alice Brown',
      customerEmail: 'alice.brown@email.com',
      amount: 149.99,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      cardLast4: '5678',
      status: 'failed',
      transactionId: 'txn_9988776655',
      date: '2024-01-12',
      gateway: 'Stripe'
    },
    {
      id: 'PAY-005',
      productName: 'Mobile App Purchase',
      customerName: 'Charlie Wilson',
      customerEmail: 'charlie.wilson@email.com',
      amount: 9.99,
      currency: 'USD',
      paymentMethod: 'Apple Pay',
      cardLast4: null,
      status: 'completed',
      transactionId: 'txn_5544332211',
      date: '2024-01-11',
      gateway: 'Apple'
    },
    {
      id: 'PAY-006',
      productName: 'Annual Subscription',
      customerName: 'David Lee',
      customerEmail: 'david.lee@email.com',
      amount: 999.99,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      cardLast4: '9999',
      status: 'refunded',
      transactionId: 'txn_6677889900',
      date: '2024-01-10',
      gateway: 'Stripe'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  type StatusType = 'completed' | 'pending' | 'failed' | 'refunded' ;
  const getStatusColor = (status: StatusType) => {
    const colors: Record<StatusType, string> = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'refunded': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentMethodIcon = (method:any) => {
    if (method.toLowerCase().includes('card')) {
      return <CreditCard className="w-4 h-4" />;
    }
    return <DollarSign className="w-4 h-4" />;
  };

  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payments.filter(payment => {
      const matchesSearch = payment.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a:any, b:any) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortBy === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [payments, searchTerm, statusFilter, sortBy, sortOrder]);

  const totalAmount = filteredAndSortedPayments.reduce((sum, payment) => {
    return payment.status === 'completed' ? sum + payment.amount : sum;
  }, 0);

  const handleSort = (field:any) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ( field:any ) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="max-w-10xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Payment Transactions</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-green-900">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Total Transactions</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{filteredAndSortedPayments.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">Pending</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">
                {filteredAndSortedPayments.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-600">Failed</span>
              </div>
              <p className="text-2xl font-bold text-red-900">
                {filteredAndSortedPayments.filter(p => p.status === 'failed').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product, customer, email, or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-1">
                    Payment ID
                    <SortIcon field="id" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('productName')}
                >
                  <div className="flex items-center gap-1">
                    Product
                    <SortIcon field="productName" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('customerName')}
                >
                  <div className="flex items-center gap-1">
                    Customer
                    <SortIcon field="customerName" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-1">
                    Amount
                    <SortIcon field="amount" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    <SortIcon field="date" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{payment.id}</div>
                    <div className="text-sm text-gray-500">{payment.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{payment.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{payment.customerName}</div>
                        <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">
                      ${payment.amount.toFixed(2)} {payment.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.paymentMethod}</div>
                        {payment.cardLast4 && (
                          <div className="text-xs text-gray-500">**** {payment.cardLast4}</div>
                        )}
                        <div className="text-xs text-gray-500">{payment.gateway}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSelectedPayment(payment)}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedPayments.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment ID</label>
                <p className="text-sm text-gray-900">{selectedPayment.id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <p className="text-sm text-gray-900">{selectedPayment.transactionId}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <p className="text-sm text-gray-900">{selectedPayment.productName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer</label>
                <p className="text-sm text-gray-900">{selectedPayment.customerName}</p>
                <p className="text-sm text-gray-500">{selectedPayment.customerEmail}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <p className="text-sm text-gray-900">${selectedPayment.amount.toFixed(2)} {selectedPayment.currency}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <p className="text-sm text-gray-900">
                  {selectedPayment.paymentMethod} 
                  {selectedPayment.cardLast4 && ` (**** ${selectedPayment.cardLast4})`}
                </p>
                <p className="text-sm text-gray-500">via {selectedPayment.gateway}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPayment.status)}`}>
                  {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="text-sm text-gray-900">
                  {new Date(selectedPayment.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <button 
                onClick={() => setSelectedPayment(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentListing;