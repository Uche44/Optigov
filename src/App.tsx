import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CitizenDashboard from './pages/CitizenDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CompanyDetailView from './pages/CompanyDetailView';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/citizen-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['citizen']}>
                    <CitizenDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/company-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/company/:id" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CompanyDetailView />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;