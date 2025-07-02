import React, { useEffect, useState } from 'react';
import '../style/StaffDashboard.css';
import type { IncidentMock } from '../../../mockdata/mockReport';
import { mockIncidents } from '../../../mockdata/mockReport';

export default function PendingIncidents() {
  const [incidents, setIncidents] = useState<IncidentMock[]>([]);
  const [mapModal, setMapModal] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const load = () => {
      let all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
      if (!Array.isArray(all) || all.length === 0) {
        localStorage.setItem('mockIncidents', JSON.stringify(mockIncidents));
        all = mockIncidents;
      }
      setIncidents(all.filter((inc: IncidentMock) => inc.status === 'รอการตอบสนอง'));
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const updateStatus = (id: number, newStatus: IncidentMock['status']) => {
    const all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
    const updated = all.map((inc: IncidentMock) =>
      inc.id === id ? { ...inc, status: newStatus } : inc
    );
    localStorage.setItem('mockIncidents', JSON.stringify(updated));
    setIncidents(updated.filter((inc: IncidentMock) => inc.status === 'รอการตอบสนอง'));
  };

  return (
    <div className="staff-dashboard-container">
      <h2>เหตุการณ์รอการตอบสนอง</h2>
      <table className="incident-table">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>ประเภท</th>
            <th>รายละเอียด</th>
            <th>สถานที่</th>
            <th>สถานะ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(inc => (
            <tr key={inc.id}>
              <td>{inc.id}</td>
              <td>{inc.type}</td>
              <td>{inc.details}</td>
              <td>
                {inc.location}
                {typeof inc.lat === 'number' && typeof inc.lng === 'number' && (
                  <button
                    style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer' }}
                    title="ดูแผนที่บน Google Maps"
                    onClick={() => setMapModal({ lat: inc.lat!, lng: inc.lng! })}
                  >
                    <i className="fas fa-map-marker-alt" style={{ color: '#e74c3c', fontSize: 18 }}></i>
                  </button>
                )}
              </td>
              <td>
                <span
                  className={`status-badge ${inc.status === 'รอการตอบสนอง' ? 'pending' : inc.status === 'กำลังดำเนินการ' ? 'in-progress' : 'resolved'}`}
                >
                  {inc.status}
                </span>
              </td>
              <td>
                {inc.status !== 'เสร็จสิ้น' && (
                  <select
                    value={inc.status}
                    onChange={(e) => updateStatus(inc.id, e.target.value as IncidentMock['status'])}
                  >
                    <option value="รอการตอบสนอง">รอการตอบสนอง</option>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                  </select>
                )}
                {inc.status === 'เสร็จสิ้น' && <span>-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mapModal && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setMapModal(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 0, minWidth: 340, minHeight: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
              <button onClick={() => setMapModal(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#e74c3c' }}>&times;</button>
            </div>
            <iframe
              title="Google Map"
              width="400"
              height="340"
              style={{ border: 0, borderRadius: 8 }}
              src={`https://maps.google.com/maps?q=${mapModal.lat},${mapModal.lng}&z=16&output=embed`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
