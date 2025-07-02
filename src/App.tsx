import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/page/Dashboard';
import ReportIncident from './components/page/Report-Incident';
import StaffDashboard from './components/page-staff/StaffDashboard';
import AllIncidents from './components/page-staff/incidents/All';
import InProgressIncidents from './components/page-staff/incidents/in-progress';
import PendingIncidents from './components/page-staff/incidents/Pending';
import ResolvedIncidents from './components/page-staff/incidents/Resolved';
import Reports from './components/page-staff/Reports';
import Profile from './components/page/Profile';
import MyIncidents from './components/page/My-Incidents';

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {user ? (
          // แสดง Sidebar เมื่อมีการล็อกอินแล้ว
          <>
            <Sidebar 
              isOpen={sidebarOpen} 
              toggleSidebar={toggleSidebar} 
              user={user} 
            />
            <div className={`main-wrapper ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
              <Navbar user={user} onLogout={handleLogout} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/report-incident" element={<ReportIncident />} />
                  <Route path="/page-staff/Dashboard" element={<StaffDashboard />} />
                  <Route path="/page-staff/incidents/Pending" element={<PendingIncidents />} />
                  <Route path="/page-staff/incidents/In-progress" element={<InProgressIncidents />} />
                  <Route path="/page-staff/incidents/Resolved" element={<ResolvedIncidents />} />
                  <Route path="/page-staff/incidents/All" element={<AllIncidents />} />
                  <Route path="/page-staff/reports" element={<Reports />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-incidents" element={<MyIncidents />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Navigate to="/dashboard" />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;