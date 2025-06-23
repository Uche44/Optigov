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
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  Shield,
  MessageSquare,
  Building,
  Eye,
  Calendar,
  User,
  Send,
  XCircle
} from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataRequest {
  id: string;
  citizenName: string;
  type: 'access' | 'delete' | 'portability' | 'rectification';
  status: 'pending' | 'completed' | 'rejected';
  date: string;
  description: string;
}

interface ComplianceItem {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'overdue';
  dueDate?: string;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'overdue';
  dueDate: string;
}

const CompanyDashboard: React.FC = () => {
  const [requests, setRequests] = useState<DataRequest[]>([]);
  const [complianceScore, setComplianceScore] = useState(83);
  const [privacyPolicyStatus, setPrivacyPolicyStatus] = useState('pending-review');
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    // Load data from localStorage or initialize
    const savedRequests = localStorage.getItem('companyRequests');
    
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      const sampleRequests: DataRequest[] = [
        {
          id: '1',
          citizenName: 'Jane Doe',
          type: 'access',
          status: 'pending',
          date: '2025-01-18',
          description: 'Request for all personal data collected'
        },
        {
          id: '2',
          citizenName: 'Alice Brown',
          type: 'delete',
          status: 'pending',
          date: '2025-01-17',
          description: 'Data Deletion Request'
        },
        {
          id: '3',
          citizenName: 'John Smith',
          type: 'rectification',
          status: 'pending',
          date: '2025-01-16',
          description: 'Information Correction Request'
        }
      ];
      setRequests(sampleRequests);
      localStorage.setItem('companyRequests', JSON.stringify(sampleRequests));
    }

    // Initialize compliance checklist
    const sampleComplianceItems: ComplianceItem[] = [
      {
        id: '1',
        title: 'Appoint a Data Protection Officer',
        status: 'completed'
      },
      {
        id: '2',
        title: 'Conduct Data Protection Impact Assessment (DPIA)',
        status: 'completed'
      },
      {
        id: '3',
        title: 'Implement Data Breach Notification Procedures',
        status: 'pending'
      }
    ];
    setComplianceItems(sampleComplianceItems);

    // Initialize reminders
    const sampleReminders: Reminder[] = [
      {
        id: '1',
        title: 'Submit quarterly compliance report',
        description: 'Due in 5 days',
        status: 'pending',
        dueDate: '2025-01-25'
      },
      {
        id: '2',
        title: 'Review data retention policies',
        description: 'Due in 10 days',
        status: 'overdue',
        dueDate: '2025-01-15'
      },
      {
        id: '3',
        title: 'Update DPO contact',
        description: 'Due in 15 days',
        status: 'pending',
        dueDate: '2025-02-05'
      }
    ];
    setReminders(sampleReminders);
  }, []);

  const handleRespondToRequest = (requestId: string, status: 'completed' | 'rejected') => {
    const updatedRequests = requests.map(request =>
      request.id === requestId ? { ...request, status } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('companyRequests', JSON.stringify(updatedRequests));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPrivacyPolicyStatus('uploaded');
      console.log('File uploaded:', file.name);
    }
  };

  // Compliance Score Chart Data
  const complianceData = {
    labels: ['Compliant', 'Non-Compliant'],
    datasets: [
      {
        data: [complianceScore, 100 - complianceScore],
        backgroundColor: ['#22c55e', '#374151'],
        borderWidth: 0,
      },
    ],
  };

  const complianceOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    cutout: '70%',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Company Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome to your dedicated dashboard for managing data protection compliance.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Login</span>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">TC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Profile */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Company Profile</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">TechCorp Solutions</h4>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                Active
              </span>
            </div>
          </div>

          {/* Incoming Data Requests */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Incoming Data Requests</h3>
              <span className="text-sm text-green-400">View All</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Data Access Request - Jane Doe</p>
                    <p className="text-gray-400 text-xs">Jane wants to access her personal data stored in your system</p>
                    <p className="text-gray-500 text-xs">2025-01-18</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-600 text-white">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Data Deletion Request - Alice Brown</p>
                    <p className="text-gray-400 text-xs">Alice wants to delete her account and all associated data</p>
                    <p className="text-gray-500 text-xs">2025-01-17</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-600 text-white">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Information Correction - John Smith</p>
                    <p className="text-gray-400 text-xs">John wants to correct his personal information</p>
                    <p className="text-gray-500 text-xs">2025-01-16</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-600 text-white">
                  New
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Compliance Checklist</h3>
              <span className="text-green-400 text-sm font-medium">Overall Compliance: 83%</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-white text-sm">Appoint a Data Protection Officer</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-white text-sm">Conduct Data Protection Impact Assessment (DPIA)</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <p className="text-white text-sm">Implement Data Breach Notification Procedures</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Privacy Policy</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Status:</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-600 text-white">
                  Pending Review
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Last updated: 2024-07-22</p>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors">
                  <Eye className="h-4 w-4 inline mr-1" />
                  View Policy
                </button>
                <label className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-center">
                  <Upload className="h-4 w-4 inline mr-1" />
                  Upload/Update Policy
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Pending Reminders */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pending Reminders</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Submit quarterly compliance report</p>
                  <p className="text-gray-400 text-xs">Due in 5 days</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-600 text-white">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Review data retention policies</p>
                  <p className="text-gray-400 text-xs">Due in 10 days</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
                  Overdue
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Update DPO contact</p>
                  <p className="text-gray-400 text-xs">Due in 15 days</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-600 text-white">
                  Pending
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Summary with Chart */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Compliance Summary</h3>
              <span className="text-green-400 text-sm font-medium">Privacy Law</span>
            </div>
            <div className="relative h-32 mb-4">
              <Doughnut data={complianceData} options={complianceOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">83%</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span className="text-gray-400">Non-Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;