import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  Users, 
  Building, 
  FileText,
  TrendingUp,
  Shield,
  Eye,
  Send,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Company {
  id: string;
  name: string;
  industry: string;
  region: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  lastAudit: string;
  complianceScore: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  time: string;
}

interface NonCompliantCompany {
  id: string;
  name: string;
  industry: string;
  region: string;
  issues: number;
  lastContact: string;
}

const AdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [nonCompliantCompanies, setNonCompliantCompanies] = useState<NonCompliantCompany[]>([]);

  useEffect(() => {
    // Initialize with sample data matching the image
    const sampleCompanies: Company[] = [
      {
        id: '1',
        name: 'GTB Nigeria',
        industry: 'Financial Services',
        region: 'Lagos',
        status: 'compliant',
        lastAudit: '2025-01-15',
        complianceScore: 95
      },
      {
        id: '2',
        name: 'Jumia Nigeria',
        industry: 'E-commerce',
        region: 'Lagos',
        status: 'warning',
        lastAudit: '2025-01-10',
        complianceScore: 78
      },
      {
        id: '3',
        name: 'MTN Nigeria',
        industry: 'Telecommunications',
        region: 'Lagos',
        status: 'compliant',
        lastAudit: '2025-01-12',
        complianceScore: 92
      },
      {
        id: '4',
        name: 'Paystack',
        industry: 'Fintech',
        region: 'Lagos',
        status: 'non-compliant',
        lastAudit: '2024-12-20',
        complianceScore: 45
      },
      {
        id: '5',
        name: 'Flutterwave',
        industry: 'Fintech',
        region: 'Lagos',
        status: 'warning',
        lastAudit: '2025-01-08',
        complianceScore: 68
      }
    ];

    const sampleActivities: RecentActivity[] = [
      {
        id: '1',
        type: 'New Company Registration',
        description: 'Konga registered for NDPR compliance',
        time: '2 hours ago'
      },
      {
        id: '2',
        type: 'Compliance Report',
        description: 'GTB Nigeria submitted quarterly report',
        time: '4 hours ago'
      },
      {
        id: '3',
        type: 'Data Breach Alert',
        description: 'Potential breach detected at TechStart',
        time: '6 hours ago'
      },
      {
        id: '4',
        type: 'Policy Update',
        description: 'NDPR guidelines updated for 2025',
        time: '1 day ago'
      }
    ];

    const sampleNonCompliantCompanies: NonCompliantCompany[] = [
      {
        id: '1',
        name: 'TechStartup',
        industry: 'Technology',
        region: 'Lagos',
        issues: 5,
        lastContact: '2025-01-15'
      },
      {
        id: '2',
        name: 'DataCorp',
        industry: 'Data Analytics',
        region: 'Abuja',
        issues: 3,
        lastContact: '2025-01-12'
      },
      {
        id: '3',
        name: 'FinanceHub',
        industry: 'Financial Services',
        region: 'Lagos',
        issues: 7,
        lastContact: '2025-01-10'
      },
      {
        id: '4',
        name: 'EcommercePlus',
        industry: 'E-commerce',
        region: 'Port Harcourt',
        issues: 4,
        lastContact: '2025-01-08'
      },
      {
        id: '5',
        name: 'CloudServices',
        industry: 'Technology',
        region: 'Lagos',
        issues: 6,
        lastContact: '2025-01-05'
      }
    ];

    setCompanies(sampleCompanies);
    setRecentActivities(sampleActivities);
    setNonCompliantCompanies(sampleNonCompliantCompanies);
  }, []);

  // Compliance Volume Trends Chart Data
  const complianceVolumeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Compliance Volume',
        data: [65, 78, 85, 72, 88, 95],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#10b981',
        pointRadius: 4,
      },
    ],
  };

  const complianceVolumeOptions = {
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
      },
    },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
          Compliant
        </span>;
      case 'warning':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-600 text-white">
          Warning
        </span>;
      case 'non-compliant':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
          Non-Compliant
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
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Login</span>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Companies</p>
                <p className="text-2xl font-bold text-white">2,418</p>
                <p className="text-xs text-green-400 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">142</p>
                <p className="text-xs text-green-400 mt-1">+8% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Data Requests</p>
                <p className="text-2xl font-bold text-white">894</p>
                <p className="text-xs text-red-400 mt-1">-2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Compliance Rate</p>
                <p className="text-2xl font-bold text-white">73</p>
                <p className="text-xs text-green-400 mt-1">+5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Compliance Volume Trends Chart */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Compliance Volume Trends</h3>
            <div className="h-80">
              <Line data={complianceVolumeData} options={complianceVolumeOptions} />
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{activity.type}</p>
                    <p className="text-xs text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Companies List */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Companies List</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600">
                  All Statuses
                </button>
                <button className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600">
                  Recent Audits
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Company ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Company Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Industry</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Region</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Last Audit</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4 text-sm text-white">2025-{company.id.padStart(2, '0')}</td>
                      <td className="py-3 px-4 text-sm text-white">{company.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{company.industry}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{company.region}</td>
                      <td className="py-3 px-4">{getStatusBadge(company.status)}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{company.lastAudit}</td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/company/${company.id}`}
                          className="inline-flex items-center px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors text-left">
                Add Company
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors text-left">
                Generate Report
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors text-left">
                View Analytics
              </button>
              <button className="w-full px-4 py-3 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors text-left">
                Send Notifications
              </button>
            </div>
          </div>

          {/* Non-Compliant Companies */}
          <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Non-Compliant Companies</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Company Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Industry</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Region</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Issues</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Last Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nonCompliantCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4 text-sm text-white">{company.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{company.industry}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{company.region}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
                          {company.issues}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{company.lastContact}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                            <Send className="h-3 w-3 mr-1" />
                            Contact
                          </button>
                          <Link
                            to={`/company/${company.id}`}
                            className="inline-flex items-center px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;