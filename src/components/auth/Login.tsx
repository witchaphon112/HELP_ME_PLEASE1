import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/Login.css';
import { mockUsers } from '../../mockdata/mockUsers';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // ดึง users จาก localStorage
    const localUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    // รวมกับ mockUsers (staff/student)
    const allUsers = [...localUsers, ...mockUsers];
    const found = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    setTimeout(() => {
      if (found) {
        onLogin(found.user);
        if (found.user.role === 'staff') {
          navigate('/staff/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">เข้าสู่ระบบ</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="กรอกอีเมล"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-login" 
            disabled={loading}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
        <p className="register-link">
          ยังไม่มีบัญชีผู้ใช้? <Link to="/register">ลงทะเบียน</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;