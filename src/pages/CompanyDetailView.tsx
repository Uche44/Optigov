import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Users,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Send
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CompanyDetail {
  id: string;
  name: string;
  industry: string;
  region: string;
  address: string;
  registrationDate: string;
  complianceScore: number;
  status: 'compliant' | 'warning' | 'non-compliant';
  lastAudit: string;
  totalUsers: number;
  dataRequests: number;
  breachHistory: number;
  privacyPolicyLastUpdated: string;
  contactEmail: string;
  dataProtectionOfficer: string;
}

interface ComplianceDetail {
  category: string;
  status: 'completed' | 'pending' | 'overdue';
  description: string;
  lastUpdated: string;
}

interface MonitoringLog {
  id: string;
  date: string;
  activity: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

interface AdminLog {
  id: string;
  date: string;
  admin: string;
  action: string;
  target: string;
}

const CompanyDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [complianceDetails, setComplianceDetails] = useState<ComplianceDetail[]>([]);
  const [monitoringLogs, setMonitoringLogs] = useState<MonitoringLog[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);

  useEffect(() => {
    // Mock company data based on ID
    const mockCompany: CompanyDetail = {
      id: id || '1',
      name: 'Tech Solutions Inc.',
      industry: 'Technology',
      region: 'Lagos',
      address: 'Plot 123, Victoria Island, Lagos State',
      registrationDate: '2020-03-15',
      complianceScore: 85,
      status: 'compliant',
      lastAudit: '2025-01-15',
      totalUsers: 15000,
      dataRequests: 45,
      breachHistory: 0,
      privacyPolicyLastUpdated: '2024-12-01',
      contactEmail: 'privacy@techsolutions.com.ng',
      dataProtectionOfficer: 'Adebayo Johnson'
    };

    const mockComplianceDetails: ComplianceDetail[] = [
      {
        category: 'Contact Information',
        status: 'completed',
        description: 'All contact details are up to date and verified',
        lastUpdated: '2025-01-15'
      },
      {
        category: 'Registration Details',
        status: 'completed',
        description: 'Company registration with CAC is current and valid',
        lastUpdated: '2025-01-10'
      },
      {
        category: 'Compliance Rating',
        status: 'completed',
        description: 'Current compliance score: 85% - Good standing',
        lastUpdated: '2025-01-15'
      },
      {
        category: 'Data Handling & Protection',
        status: 'completed',
        description: 'Data protection policies implemented and staff trained',
        lastUpdated: '2025-01-12'
      },
      {
        category: 'Privacy Policy',
        status: 'completed',
        description: 'Privacy policy updated and compliant with NDPR',
        lastUpdated: '2024-12-01'
      },
      {
        category: 'Contact Methods',
        status: 'pending',
        description: 'Additional contact methods need verification',
        lastUpdated: '2025-01-08'
      }
    ];

    const mockMonitoringLogs: MonitoringLog[] = [
      {
        id: '1',
        date: '2025-01-18',
        activity: 'Data Request Response',
        status: 'success',
        details: 'Responded to citizen data access request within 72 hours'
      },
      {
        id: '2',
        date: '2025-01-17',
        activity: 'Privacy Policy Update',
        status: 'success',
        details: 'Privacy policy updated to include new data categories'
      },
      {
        id: '3',
        date: '2025-01-16',
        activity: 'Security Audit',
        status: 'warning',
        details: 'Minor security recommendations identified during audit'
      },
      {
        id: '4',
        date: '2025-01-15',
        activity: 'Compliance Check',
        status: 'success',
        details: 'Quarterly compliance assessment completed successfully'
      }
    ];

    const mockAdminLogs: AdminLog[] = [
      {
        id: '1',
        date: '2025-01-18',
        admin: 'System Administrator',
        action: 'Compliance Review',
        target: 'Tech Solutions Inc.'
      },
      {
        id: '2',
        date: '2025-01-17',
        admin: 'Data Protection Officer',
        action: 'Policy Update Approval',
        target: 'Privacy Policy v2.1'
      },
      {
        id: '3',
        date: '2025-01-16',
        admin: 'Compliance Officer',
        action: 'Security Assessment',
        target: 'Data Handling Procedures'
      }
    ];

    setCompany(mockCompany);
    setComplianceDetails(mockComplianceDetails);
    setMonitoringLogs(mockMonitoringLogs);
    setAdminLogs(mockAdminLogs);
  }, [id]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-lg">Loading company details...</div>
      </div>
    );
  }

  // Data Request Response Time Chart
  const responseTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Response Time (Days)',
        data: [2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 2, 1],
        backgroundColor: '#374151',
        borderColor: '#6b7280',
        borderWidth: 1,
      },
    ],
  };

  const responseTimeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
          Completed
        </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-600 text-white">
          Pending
        </span>;
      case 'overdue':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
          Overdue
        </span>;
      case 'success':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
          Success
        </span>;
      case 'warning':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-600 text-white">
          Warning
        </span>;
      case 'error':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
          Error
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin-dashboard"
              className="inline-flex items-center px-3 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{company.name}</h1>
              <p className="text-gray-400 text-sm">{company.industry} • {company.region}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white">
              2 Flag for Review
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Login</span>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Company Name</p>
                  <p className="text-white">{company.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Industry</p>
                  <p className="text-white">{company.industry}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white">{company.address}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{company.contactEmail}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">DPO</p>
                  <p className="text-white">{company.dataProtectionOfficer}</p>
                </div>
              </div>
            </div>

            {/* Data Handling & Protection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Data Handling & Protection</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Data Protection Officer Appointed</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Privacy Policy Updated</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Staff Training Completed</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Data Breach Response Plan</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Regular Security Audits</span>
                  <Clock className="h-4 w-4 text-orange-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Data Retention Policies</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Email Support</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Phone Support</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Online Portal</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Physical Office</span>
                  <Clock className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Registration Details */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Registration Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Registration Date</p>
                  <p className="text-white">{company.registrationDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Audit</p>
                  <p className="text-white">{company.lastAudit}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-white">{company.totalUsers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Data Requests</p>
                  <p className="text-white">{company.dataRequests}</p>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Privacy Policy</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                    Up to Date
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white">{company.privacyPolicyLastUpdated}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors">
                    <Eye className="h-4 w-4 inline mr-1" />
                    View Policy
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                    <Send className="h-4 w-4 inline mr-1" />
                    Send Request
                  </button>
                </div>
              </div>
            </div>

            {/* Data Request Response Time Chart */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Avg Request Response Time (Days)</h3>
              <div className="h-48">
                <Bar data={responseTimeData} options={responseTimeOptions} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Compliance Rating */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Rating</h3>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#374151"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#22c55e"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${company.complianceScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{company.complianceScore}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Overall Compliance Score</p>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                  View Detailed Score →
                </button>
              </div>
            </div>

            {/* Monitoring Log */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monitoring Log</h3>
              <div className="space-y-3">
                {monitoringLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white text-sm font-medium">{log.activity}</p>
                        {getStatusBadge(log.status)}
                      </div>
                      <p className="text-gray-400 text-xs">{log.details}</p>
                      <p className="text-gray-500 text-xs mt-1">{log.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Action Log */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Admin Action Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Admin</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Target</th>
                </tr>
              </thead>
              <tbody>
                {adminLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-4 text-sm text-white">{log.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{log.admin}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{log.action}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{log.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailView;