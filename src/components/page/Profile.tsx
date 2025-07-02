import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user || !user.name) {
    return (
      <div className="profile-container">
        <h2>ข้อมูลส่วนตัว</h2>
        <div className="profile-empty">
          ไม่พบข้อมูลผู้ใช้ <br />
          <Link to="/login" className="profile-link">
            ไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  const roleLabel = user.role === 'staff' ? 'เจ้าหน้าที่' : user.role === 'admin' ? 'ผู้ดูแล' : 'นักศึกษา/บุคลากร';

  return (
    <div className="profile-container" style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <Link to="/dashboard" className="profile-back" style={{ color: '#888', textDecoration: 'none', fontWeight: 500 }}>
          &larr; กลับหน้าหลัก
        </Link>
      </div>

      <div className="profile-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 48, color: '#e67e22', boxShadow: '0 2px 8px rgba(230,126,34,0.08)' }}>
          <i className="fas fa-user"></i>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#222', marginBottom: 2 }}>{user.name}</div>
        <div style={{ color: '#888', fontSize: 16, marginBottom: 8 }}>{roleLabel}</div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {user.studentId && <div><strong>รหัสนักศึกษา/บุคลากร:</strong> {user.studentId}</div>}
          <div><strong>อีเมล:</strong> {user.email}</div>
          {user.phone && <div><strong>เบอร์โทรศัพท์:</strong> {user.phone}</div>}
          {user.address && <div><strong>ที่อยู่:</strong> {user.address}</div>}
        </div>
      </div>
      <style>{`
        .profile-container { background: #f8f9fa; min-height: 100vh; }
        @media (max-width: 600px) {
          .profile-card { padding: 18px !important; }
        }
      `}</style>
    </div>
  );
}
