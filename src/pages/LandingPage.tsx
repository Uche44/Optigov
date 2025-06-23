import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Shield, 
  Users, 
  Building, 
  FileCheck, 
  Lock, 
  Eye,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: Shield,
      title: 'Data Protection Rights',
      description: 'Know and exercise your fundamental data protection rights under NDPR',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      icon: FileCheck,
      title: 'Compliance Monitoring',
      description: 'Track company compliance with Nigerian data protection regulations',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      icon: Eye,
      title: 'Transparency Tools',
      description: 'Get clear insights into how your personal data is being used',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    },
    {
      icon: Lock,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your privacy and data',
      color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
    }
  ];

  const benefits = [
    'Submit data access and deletion requests',
    'Track compliance status of companies',
    'Receive breach notifications',
    'Download detailed reports',
    'Monitor enforcement actions',
    'Access educational resources'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">OptiGov</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-8">
              🇳🇬 Nigeria Data Protection Regulation (NDPR) Compliance
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Empowering Nigerians with
              <span className="text-green-600 block">Data Control</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Take control of your personal data with OptiGov - Nigeria's comprehensive NDPR compliance platform. 
              Exercise your rights, track company compliance, and ensure your data is protected.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg group"
              >
                <Users className="h-5 w-5 mr-2" />
                I'm a Citizen
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-600 dark:hover:border-green-500 transition-colors font-semibold text-lg group"
              >
                <Building className="h-5 w-5 mr-2" />
                I'm a Company
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Data Protection Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to understand, exercise, and protect your data rights under Nigerian law
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What You Can Do with OptiGov
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our platform provides comprehensive tools for citizens, companies, and regulators to ensure NDPR compliance and data protection.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
                  <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to Get Started?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Choose your role to access the platform</p>
                </div>
                
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="block w-full px-6 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Citizen Portal
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Company Portal
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full px-6 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Admin Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold">OptiGov</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering Nigerians with comprehensive data protection and NDPR compliance tools.
              </p>
              <p className="text-sm text-gray-500">
                © 2025 OptiGov. All rights reserved. Built for Nigeria's data protection needs.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NDPR Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;