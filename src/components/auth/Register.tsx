import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/Register.css';
import { mockUsers } from '../../mockdata/mockUsers';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, studentId, email, phone, address, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
    }
    setLoading(true);
    setError('');
    // mock: เพิ่ม user ใหม่ใน localStorage
    const newUser = {
      email,
      password,
      user: { name, role: 'student', token: 'mock-token' }
    };
    // ดึง users เดิมจาก localStorage (หรือ array ว่าง)
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    // เช็คซ้ำ
    if (users.find((u: any) => u.email === email) || mockUsers.find((u) => u.email === email)) {
      setError('อีเมลนี้ถูกใช้ไปแล้ว');
      setLoading(false);
      return;
    }
    users.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser.user));
    localStorage.setItem('token', newUser.user.token);
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">ลงทะเบียนผู้ใช้งาน</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">ชื่อ-นามสกุล</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="กรอกชื่อ-นามสกุล"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentId">รหัสนักศึกษา/บุคลากร</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={handleChange}
              placeholder="กรอกรหัสนักศึกษาหรือรหัสบุคลากร"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="0xxxxxxxxx"
              pattern="[0-9]{10}"
              title="กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">สถานที่พัก/ที่อยู่</label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="กรอกสถานที่พักหรือที่อยู่ที่สามารถติดต่อได้"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร"
              minLength={6}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              minLength={6}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn-register" 
            disabled={loading}
          >
            {loading ? 'กำลังดำเนินการ...' : 'ลงทะเบียน'}
          </button>
        </form>
        <p className="login-link">
          มีบัญชีผู้ใช้แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;