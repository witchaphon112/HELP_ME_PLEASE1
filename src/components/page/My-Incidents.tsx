import React, { useEffect, useState } from 'react';

interface Incident {
  id: number;
  type: string;
  details: string;
  location: string;
  status: string;
  email: string;
  note?: string;
  date?: string;
}

export default function MyIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [userEmail, setUserEmail] = useState('');

  const loadIncidents = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserEmail(user?.email || '');
    const all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
    setIncidents(all.filter((inc: Incident) => inc.email === user?.email));
  };

  useEffect(() => {
    loadIncidents();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mockIncidents') {
        loadIncidents();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const statusColor = (status: string) => {
    if (status === 'รอการตอบสนอง') return 'badge-pending';
    if (status === 'กำลังดำเนินการ') return 'badge-inprogress';
    if (status === 'เสร็จสิ้น') return 'badge-resolved';
    return '';
  };

  return (
    <div className="my-incidents-container" style={{ maxWidth: 900, marginTop: '4rem', margin: '0 auto', padding: 24 }}>
      <h2>เหตุฉุกเฉินของฉัน</h2>
      {incidents.length === 0 ? (
        <div>ยังไม่มีการแจ้งเหตุ</div>
      ) : (
        <table className="incident-table" style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ประเภท</th>
              <th>รายละเอียด</th>
              <th>สถานที่</th>
              <th>วันที่แจ้งเหตุ</th>
              <th>สถานะ</th>
              <th>หมายเหตุ/การช่วยเหลือ</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => (
              <tr key={inc.id}>
                <td>{inc.id}</td>
                <td>{inc.type}</td>
                <td>{inc.details}</td>
                <td>{inc.location}</td>
                <td>{inc.date ? new Date(inc.date).toLocaleString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                <td>
                  <span className={`status-badge ${statusColor(inc.status)}`}>{inc.status}</span>
                </td>
                <td>{inc.note ? inc.note : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>{`
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.95em;
          font-weight: 600;
          color: #fff;
        }
        .badge-pending { background: #f39c12; }
        .badge-inprogress { background: #3498db; }
        .badge-resolved { background: #2ecc71; }
      `}</style>
    </div>
  );
}
