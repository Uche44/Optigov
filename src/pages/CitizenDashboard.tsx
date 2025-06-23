import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  Download, 
  Send,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  User,
  Building,
  Calendar,
  Bell,
  Settings,
  Lock,
  Database,
  UserCheck,
  FileCheck,
  Zap
} from 'lucide-react';
import jsPDF from 'jspdf';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataRequest {
  id: string;
  company: string;
  type: 'access' | 'delete' | 'portability' | 'rectification';
  status: 'pending' | 'completed' | 'rejected' | 'in-progress';
  date: string;
  description: string;
  requestedBy: string;
  responseDate?: string;
}

interface Alert {
  id: string;
  type: 'breach' | 'warning' | 'info';
  message: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  company?: string;
}

interface NDPRRight {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'exercised' | 'available' | 'pending';
  lastUsed?: string;
}

const CitizenDashboard: React.FC = () => {
  const [requests, setRequests] = useState<DataRequest[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [ndprRights, setNdprRights] = useState<NDPRRight[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [requestType, setRequestType] = useState<'access' | 'delete' | 'portability' | 'rectification'>('access');
  const [requestDescription, setRequestDescription] = useState('');
  const [healthScore] = useState(85);

  const companies = [
    'GTBank Nigeria',
    'Jumia Nigeria',
    'Flutterwave',
    'Paystack',
    'Konga',
    'MTN Nigeria',
    'Airtel Nigeria',
    'First Bank Nigeria',
    'Zenith Bank',
    'Access Bank',
    'UBA Nigeria',
    'Interswitch'
  ];

  useEffect(() => {
    // Initialize NDPR Rights
    const initialRights: NDPRRight[] = [
      {
        id: '1',
        title: 'Right to be Informed',
        description: 'Know how your personal data is being used',
        icon: Eye,
        status: 'exercised',
        lastUsed: '2025-01-15'
      },
      {
        id: '2',
        title: 'Right of Access',
        description: 'Request access to your personal data',
        icon: FileText,
        status: 'available'
      },
      {
        id: '3',
        title: 'Right to Rectification',
        description: 'Correct inaccurate personal data',
        icon: FileCheck,
        status: 'pending'
      },
      {
        id: '4',
        title: 'Right to Erasure (Right to be Forgotten)',
        description: 'Request deletion of your personal data',
        icon: Trash2,
        status: 'available'
      },
      {
        id: '5',
        title: 'Right to Restrict Processing',
        description: 'Limit how your data is processed',
        icon: Lock,
        status: 'available'
      },
      {
        id: '6',
        title: 'Right to Data Portability',
        description: 'Transfer your data between services',
        icon: Database,
        status: 'exercised',
        lastUsed: '2025-01-10'
      },
      {
        id: '7',
        title: 'Right to Object',
        description: 'Object to processing of your data',
        icon: Shield,
        status: 'available'
      }
    ];

    // Load data from localStorage or initialize
    const savedRequests = localStorage.getItem('citizenRequests');
    const savedAlerts = localStorage.getItem('citizenAlerts');

    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      const sampleRequests: DataRequest[] = [
        {
          id: '1',
          company: 'GTBank Nigeria',
          type: 'access',
          status: 'completed',
          date: '2025-01-15',
          description: 'Request for all personal data collected',
          requestedBy: 'John Doe',
          responseDate: '2025-01-18'
        },
        {
          id: '2',
          company: 'Jumia Nigeria',
          type: 'delete',
          status: 'in-progress',
          date: '2025-01-18',
          description: 'Delete unused account data',
          requestedBy: 'John Doe'
        },
        {
          id: '3',
          company: 'Paystack',
          type: 'portability',
          status: 'pending',
          date: '2025-01-19',
          description: 'Export payment history data',
          requestedBy: 'John Doe'
        },
        {
          id: '4',
          company: 'MTN Nigeria',
          type: 'rectification',
          status: 'completed',
          date: '2025-01-12',
          description: 'Update incorrect contact information',
          requestedBy: 'John Doe',
          responseDate: '2025-01-14'
        },
        {
          id: '5',
          company: 'Flutterwave',
          type: 'access',
          status: 'rejected',
          date: '2025-01-10',
          description: 'Request transaction logs',
          requestedBy: 'John Doe',
          responseDate: '2025-01-13'
        },
        {
          id: '6',
          company: 'Konga',
          type: 'delete',
          status: 'pending',
          date: '2025-01-20',
          description: 'Remove old shopping preferences',
          requestedBy: 'John Doe'
        }
      ];
      setRequests(sampleRequests);
      localStorage.setItem('citizenRequests', JSON.stringify(sampleRequests));
    }

    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    } else {
      const sampleAlerts: Alert[] = [
        {
          id: '1',
          type: 'breach',
          message: 'NIN LEAK DETECTED: Your National Identification Number was found in a recent data breach. Please review your security settings.',
          date: '2025-01-18',
          severity: 'high',
          company: 'Unknown Source'
        },
        {
          id: '2',
          type: 'warning',
          message: 'SUSPICIOUS LOGIN ATTEMPT: Someone tried to access your account from an unrecognized device.',
          date: '2025-01-17',
          severity: 'medium'
        },
        {
          id: '3',
          type: 'info',
          message: 'POLICY UPDATE: Paystack has updated their privacy policy. Review the changes to understand how your data is used.',
          date: '2025-01-16',
          severity: 'low',
          company: 'Paystack'
        }
      ];
      setAlerts(sampleAlerts);
      localStorage.setItem('citizenAlerts', JSON.stringify(sampleAlerts));
    }

    setNdprRights(initialRights);
  }, []);

  const handleSubmitRequest = () => {
    if (!selectedCompany || !requestDescription) return;

    const newRequest: DataRequest = {
      id: Date.now().toString(),
      company: selectedCompany,
      type: requestType,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      description: requestDescription,
      requestedBy: 'John Doe'
    };

    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('citizenRequests', JSON.stringify(updatedRequests));

    setSelectedCompany('');
    setRequestDescription('');
    setShowRequestForm(false);
  };

  const downloadPDF = (request: DataRequest) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Data Request Report', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Request ID: ${request.id}`, 20, 50);
    doc.text(`Company: ${request.company}`, 20, 65);
    doc.text(`Type: ${request.type.toUpperCase()}`, 20, 80);
    doc.text(`Status: ${request.status.toUpperCase()}`, 20, 95);
    doc.text(`Date: ${request.date}`, 20, 110);
    doc.text(`Description: ${request.description}`, 20, 125);
    
    doc.save(`data-request-${request.id}.pdf`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
          Completed
        </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
          Rejected
        </span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-600 text-white">
          In Progress
        </span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-600 text-white">
          Pending
        </span>;
    }
  };

  const getRightStatusIcon = (status: string) => {
    switch (status) {
      case 'exercised':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <div className="h-4 w-4 border-2 border-gray-400 rounded-full" />;
    }
  };

  // Health Score Chart Data
  const healthScoreData = {
    labels: ['Protected', 'At Risk'],
    datasets: [
      {
        data: [healthScore, 100 - healthScore],
        backgroundColor: ['#22c55e', '#374151'],
        borderWidth: 0,
      },
    ],
  };

  const healthScoreOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    cutout: '70%',
  };

  return (
    <Layout title="Welcome, Citizen!">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome, Citizen!</h1>
          <p className="text-green-100">Take control of your personal data and exercise your NDPR rights</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - NDPR Rights */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your NDPR Rights Overview</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {ndprRights.map((right) => (
                    <div key={right.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getRightStatusIcon(right.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {right.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {right.description}
                        </p>
                        {right.lastUsed && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            Last used: {right.lastUsed}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Data Requests */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Data Requests</h3>
                  <button
                    onClick={() => setShowRequestForm(!showRequestForm)}
                    className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New Request
                  </button>
                </div>
              </div>

              {showRequestForm && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Company
                      </label>
                      <select
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Choose a company</option>
                        {companies.map((company) => (
                          <option key={company} value={company}>{company}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Request Type
                      </label>
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="access">Access My Data</option>
                        <option value="delete">Delete My Data</option>
                        <option value="portability">Data Portability</option>
                        <option value="rectification">Rectify Data</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={requestDescription}
                        onChange={(e) => setRequestDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        placeholder="Describe your request..."
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSubmitRequest}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Submit Request
                      </button>
                      <button
                        onClick={() => setShowRequestForm(false)}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {requests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {request.company}
                          </p>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {request.type} • {request.date}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                          {request.description}
                        </p>
                      </div>
                      <button
                        onClick={() => downloadPDF(request)}
                        className="ml-3 p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Health Score */}
          <div className="lg:col-span-1 space-y-6">
            {/* Data Security Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Security Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                      'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 ${
                          alert.severity === 'high' ? 'text-red-600' :
                          alert.severity === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {alert.type === 'breach' ? <AlertTriangle className="h-5 w-5" /> :
                           alert.type === 'warning' ? <Shield className="h-5 w-5" /> :
                           <Bell className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            alert.severity === 'high' ? 'text-red-800 dark:text-red-200' :
                            alert.severity === 'medium' ? 'text-yellow-800 dark:text-yellow-200' :
                            'text-blue-800 dark:text-blue-200'
                          }`}>
                            {alert.message}
                          </p>
                          <p className={`text-xs mt-1 ${
                            alert.severity === 'high' ? 'text-red-600 dark:text-red-400' :
                            alert.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-blue-600 dark:text-blue-400'
                          }`}>
                            {alert.date} {alert.company && `• ${alert.company}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Protection Health Score */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Protection Health Score</h3>
              </div>
              <div className="p-6">
                <div className="relative h-32 mb-4">
                  <Doughnut data={healthScoreData} options={healthScoreOptions} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{healthScore}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Your data protection health is <span className="font-semibold text-green-600">Good</span>
                  </p>
                </div>
              </div>
            </div>

            {/* NDPR Learning Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">NDPR Learning Resources</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Understanding Your Rights</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Learn about NDPR basics</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Data Security Tips</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Protect your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Quick Actions Guide</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">How to exercise your rights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CitizenDashboard;