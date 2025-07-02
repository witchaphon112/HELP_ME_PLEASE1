import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.css';

interface NavbarProps {
  user?: {
    name: string;
    role: string;
  } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ระบบแจ้งเหตุฉุกเฉิน
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-item">
                หน้าหลัก
              </Link>
              {(user.role === 'staff' || user.role === 'admin') && (
                <>
                  
                </>
              )}
              {user.role === 'student' && (
                <Link to="/report-incident" className="navbar-item navbar-alert">
                  แจ้งเหตุฉุกเฉิน
                </Link>
              )}
              <div className="navbar-item dropdown">
                <button className="dropdown-button">
                  <i className="fas fa-user-circle"></i> {user.name}
                  <i className="fas fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile" className="dropdown-item">
                    ข้อมูลส่วนตัว
                  </Link>
                  <button onClick={onLogout} className="dropdown-item logout-button">
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-item">
                เข้าสู่ระบบ
              </Link>
              <Link to="/register" className="navbar-item navbar-highlight">
                ลงทะเบียน
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;