import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Phone, Mail, Calendar, DollarSign, User, Building, FileText } from 'lucide-react';

const InsuranceDashboard = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      policyType: 'Auto Insurance',
      business: 'Personal',
      status: 'New',
      premium: 1200,
      dateCreated: '2024-01-15',
      notes: 'Interested in comprehensive coverage for 2022 Honda Civic'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@business.com',
      phone: '+1 (555) 987-6543',
      policyType: 'Commercial Property',
      business: 'Retail Store',
      status: 'In Review',
      premium: 5500,
      dateCreated: '2024-01-18',
      notes: 'Small retail business, 2500 sq ft, downtown location'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@gmail.com',
      phone: '+1 (555) 456-7890',
      policyType: 'Life Insurance',
      business: 'Personal',
      status: 'Quoted',
      premium: 800,
      dateCreated: '2024-01-20',
      notes: 'Term life insurance, 30-year term, $500k coverage'
    },
    {
      id: 4,
      name: 'Tech Solutions LLC',
      email: 'contact@techsolutions.com',
      phone: '+1 (555) 234-5678',
      policyType: 'Professional Liability',
      business: 'Technology',
      status: 'Approved',
      premium: 3200,
      dateCreated: '2024-01-22',
      notes: 'IT consulting firm, 25 employees, E&O coverage needed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [businessFilter, setBusinessFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  type Lead = typeof leads[number];
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    policyType: '',
    business: '',
    status: 'New',
    premium: '',
    notes: ''
  });

  const policyTypes = [
    'Auto Insurance',
    'Home Insurance',
    'Life Insurance',
    'Commercial Property',
    'Professional Liability',
    'Workers Compensation',
    'Cyber Liability',
    'General Liability'
  ];

  const businessTypes = [
    'Personal',
    'Retail Store',
    'Restaurant',
    'Technology',
    'Healthcare',
    'Construction',
    'Manufacturing',
    'Professional Services'
  ];

  const statuses = ['New', 'In Review', 'Quoted', 'Approved', 'Declined', 'On Hold'];

  type StatusType = 'New' | 'In Review' | 'Quoted' | 'Approved' | 'Declined' | 'On Hold';
  const getStatusColor = (status: StatusType) => {
    const colors: Record<StatusType, string> = {
      'New': 'bg-blue-100 text-blue-800',
      'In Review': 'bg-yellow-100 text-yellow-800',
      'Quoted': 'bg-purple-100 text-purple-800',
      'Approved': 'bg-green-100 text-green-800',
      'Declined': 'bg-red-100 text-red-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return colors[status] ?? 'bg-gray-100 text-gray-800';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.policyType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesBusiness = businessFilter === 'All' || lead.business === businessFilter;
    
    return matchesSearch && matchesStatus && matchesBusiness;
  });

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.policyType || !formData.business || !formData.premium) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingLead) {
      setLeads(leads.map((lead:any) => 
        lead.id === editingLead.id 
          ? { ...lead, ...formData }
          : lead
      ));
    } else {
      const newLead = {
        id: Math.max(...leads.map(l => l.id)) + 1,
        ...formData,
        premium: parseFloat(formData.premium),
        dateCreated: new Date().toISOString().split('T')[0]
      };
      setLeads([...leads, newLead]);
    }
    
    closeModal();
  };

  const handleEdit = (lead:any) => {
    setEditingLead(lead);
    setFormData({ ...lead, premium: lead.premium.toString() });
    setIsModalOpen(true);
  };

  const handleDelete = (id:any) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  const handleView = (lead:any) => {
    setViewingLead(lead);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      policyType: '',
      business: '',
      status: 'New',
      premium: '',
      notes: ''
    });
  };

  const closeViewModal = () => {
    setViewingLead(null);
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    inReview: leads.filter(l => l.status === 'In Review').length,
    approved: leads.filter(l => l.status === 'Approved').length,
    totalPremium: leads.filter(l => l.status === 'Approved').reduce((sum, l) => sum + l.premium, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-10xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Policy Requests</h1>
          <p className="text-gray-600">Manage leads and policy requests across all business lines</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inReview}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-indigo-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Premium</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalPremium.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={businessFilter}
                onChange={(e) => setBusinessFilter(e.target.value)}
              >
                <option value="All">All Business Types</option>
                {businessTypes.map(business => (
                  <option key={business} value={business}>{business}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New Lead
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.policyType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.business}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status as StatusType)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lead.premium.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.dateCreated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(lead)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(lead)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit Lead"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No leads found matching your criteria.</div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.policyType}
                    onChange={(e) => setFormData({...formData, policyType: e.target.value})}
                  >
                    <option value="">Select Policy Type</option>
                    {policyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.business}
                    onChange={(e) => setFormData({...formData, business: e.target.value})}
                  >
                    <option value="">Select Business Type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Premium ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.premium}
                    onChange={(e) => setFormData({...formData, premium: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingLead ? 'Update Lead' : 'Add Lead'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Lead Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{viewingLead.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{viewingLead.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{viewingLead.phone}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Policy Type</label>
                  <p className="text-gray-900">{viewingLead.policyType}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Business</label>
                  <p className="text-gray-900">{viewingLead.business}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingLead.status as StatusType)}`}>
                    {viewingLead.status}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Premium</label>
                  <p className="text-gray-900">${viewingLead.premium.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date Created</label>
                  <p className="text-gray-900">{viewingLead.dateCreated}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Notes</label>
                  <p className="text-gray-900">{viewingLead.notes || 'No notes available'}</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => {
                    closeViewModal();
                    handleEdit(viewingLead);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Edit Lead
                </button>
                <button
                  onClick={closeViewModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceDashboard;