import React, { useEffect, useState } from 'react';
import type { IncidentMock } from '../../mockdata/mockReport';

const typeIcons: Record<string, string> = {
  'อุบัติเหตุ': 'fa-solid fa-car-crash',
  'เจ็บป่วย': 'fa-solid fa-heart-pulse',
  'เหตุรุนแรง': 'fa-solid fa-hand-fist',
  'ทะเลาะวิวาท': 'fa-solid fa-user-ninja',
  'ไฟไหม้': 'fa-solid fa-fire',
  'อื่น ๆ': 'fa-solid fa-question',
};

const statusIcons: Record<string, string> = {
  'รอการตอบสนอง': 'fa-regular fa-clock',
  'กำลังดำเนินการ': 'fa-solid fa-spinner',
  'เสร็จสิ้น': 'fa-solid fa-check-circle',
};

export default function Reports() {
  const [incidents, setIncidents] = useState<IncidentMock[]>([]);

  useEffect(() => {
    const load = () => {
      let all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
      if (!Array.isArray(all) || all.length === 0) {
        all = [];
      }
      setIncidents(all);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  // รวมสถิติตามประเภท
  const typeStats = incidents.reduce((acc, inc) => {
    acc[inc.type] = (acc[inc.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // รวมสถิติตามสถานะ (ตอบสนอง)
  const statusStats = incidents.reduce((acc, inc) => {
    acc[inc.status] = (acc[inc.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Mock เวลาตอบสนองเฉลี่ย (นาที)
  const avgResponseTime = 12;

  return (
    <div className="staff-dashboard-container" style={{ maxWidth: 900,marginTop:'3rem', margin: '0 auto', padding: 24 }}>
      <h2 style={{ color: '#e74c3c', fontWeight: 700, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
        <i className="fas fa-chart-bar" style={{ color: '#e67e22', fontSize: 32 }}></i>
        รายงานและสถิติ
      </h2>

      {/* การ์ดสรุปสถานะ */}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ flex: 1, minWidth: 180, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(52,152,219,0.07)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <i className="fa-regular fa-clock" style={{ color: '#f39c12', fontSize: 32 }}></i>
          <div>
            <div style={{ fontWeight: 600, color: '#888' }}>รอการตอบสนอง</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f39c12' }}>{statusStats['รอการตอบสนอง'] || 0} <span style={{ fontSize: 14, fontWeight: 400 }}>ครั้ง</span></div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(52,152,219,0.07)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <i className="fa-solid fa-spinner" style={{ color: '#3498db', fontSize: 32 }}></i>
          <div>
            <div style={{ fontWeight: 600, color: '#888' }}>กำลังดำเนินการ</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#3498db' }}>{statusStats['กำลังดำเนินการ'] || 0} <span style={{ fontSize: 14, fontWeight: 400 }}>ครั้ง</span></div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(52,152,219,0.07)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <i className="fa-solid fa-check-circle" style={{ color: '#2ecc71', fontSize: 32 }}></i>
          <div>
            <div style={{ fontWeight: 600, color: '#888' }}>เสร็จสิ้น</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#2ecc71' }}>{statusStats['เสร็จสิ้น'] || 0} <span style={{ fontSize: 14, fontWeight: 400 }}>ครั้ง</span></div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 180, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(52,152,219,0.07)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <i className="fa-solid fa-stopwatch" style={{ color: '#e67e22', fontSize: 32 }}></i>
          <div>
            <div style={{ fontWeight: 600, color: '#888' }}>เวลาตอบสนองเฉลี่ย</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#e67e22' }}>{avgResponseTime} <span style={{ fontSize: 14, fontWeight: 400 }}>นาที</span></div>
          </div>
        </div>
      </div>

      {/* รายงานจำนวนเหตุฉุกเฉินตามประเภท */}
      <div className="staff-dashboard-section">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e67e22', fontWeight: 700 }}>
          <i className="fas fa-layer-group"></i> สรุปจำนวนเหตุฉุกเฉินตามประเภท
        </h3>
        <table className="incident-type-table" style={{ marginBottom: 24, width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(230,126,34,0.06)', overflow: 'hidden' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: 12, fontWeight: 600, color: '#e67e22', fontSize: 16 }}>ประเภทเหตุ</th>
              <th style={{ padding: 12, fontWeight: 600, color: '#e67e22', fontSize: 16 }}>จำนวน (ครั้ง)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(typeStats).map(([type, count]) => (
              <tr key={type} style={{ borderBottom: '1px solid #f2f2f2' }}>
                <td style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <i className={typeIcons[type] || 'fa-solid fa-question'} style={{ color: '#e67e22', fontSize: 22 }}></i>
                  {type}
                </td>
                <td style={{ padding: 12, fontWeight: 600, color: '#222', fontSize: 18 }}>{count}</td>
              </tr>
            ))}
            {Object.keys(typeStats).length === 0 && (
              <tr><td colSpan={2} style={{ textAlign: 'center', color: '#888', padding: 18 }}>ไม่มีข้อมูล</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .staff-dashboard-container { padding: 8px; }
          .staff-dashboard-section { padding: 0; }
        }
        .staff-dashboard-section h3 { margin-bottom: 16px; }
      `}</style>
    </div>
  );
}
