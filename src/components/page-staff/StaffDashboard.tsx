import React, { useEffect, useState } from 'react';
import './style/StaffDashboard.css';
import type { IncidentMock } from '../../mockdata/mockReport';

export default function StaffDashboard() {
  const [incidents, setIncidents] = useState<IncidentMock[]>([]);

  useEffect(() => {
    const load = () => {
      let all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
      if (!Array.isArray(all) || all.length === 0) {
        // ไม่ควรเกิดขึ้นถ้า init แล้ว แต่กันไว้
        all = [];
      }
      setIncidents(all);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const total = incidents.length;
  const pending = incidents.filter(i => i.status === 'รอการตอบสนอง').length;
  const inProgress = incidents.filter(i => i.status === 'กำลังดำเนินการ').length;
  const resolved = incidents.filter(i => i.status === 'เสร็จสิ้น').length;
  const stats = [
    { label: 'แจ้งเหตุทั้งหมด', value: total, icon: 'fas fa-bell', color: '#e67e22' },
    { label: 'รอการตอบสนอง', value: pending, icon: 'fas fa-hourglass-half', color: '#f39c12' },
    { label: 'กำลังดำเนินการ', value: inProgress, icon: 'fas fa-spinner', color: '#3498db' },
    { label: 'เสร็จสิ้น', value: resolved, icon: 'fas fa-check-circle', color: '#2ecc71' },
  ];

  // Mock กิจกรรมล่าสุด (อาจจะดึงจาก incidents จริงได้)
  const recent = incidents.slice(-3).reverse();

  return (
    <div className="staff-dashboard-container">
      <h2>แดชบอร์ดเจ้าหน้าที่</h2>
      <div className="staff-stats-grid">
        {stats.map((s, idx) => (
          <div className="staff-stat-card" key={idx} style={{ borderLeft: `6px solid ${s.color}` }}>
            <div className="stat-icon" style={{ color: s.color }}>
              <i className={s.icon}></i>
            </div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="staff-dashboard-section">
        <h3>กิจกรรมล่าสุด</h3>
        <ul className="recent-activity-list">
          {recent.length === 0 && <li>ไม่มีเหตุการณ์ล่าสุด</li>}
          {recent.map((inc) => (
            <li key={inc.id}>
              {inc.type} - {inc.details} ({inc.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
