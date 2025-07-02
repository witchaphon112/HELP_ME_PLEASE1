import React, { useState } from 'react';
import './style/Report-Incident.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const incidentTypes = [
  { label: 'อุบัติเหตุ', value: 'อุบัติเหตุ', icon: 'fa-solid fa-car-crash' },
  { label: 'เจ็บป่วย', value: 'เจ็บป่วย', icon: 'fa-solid fa-heart-pulse' },
  { label: 'เหตุรุนแรง', value: 'เหตุรุนแรง', icon: 'fa-solid fa-hand-fist' },
  { label: 'ทะเลาะวิวาท', value: 'ทะเลาะวิวาท', icon: 'fa-solid fa-user-ninja' },
  { label: 'ไฟไหม้', value: 'ไฟไหม้', icon: 'fa-solid fa-fire' },
  { label: 'อื่น ๆ', value: 'อื่น ๆ', icon: 'fa-solid fa-question' },
];

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function LocationPicker({ position, setPosition }: { position: [number, number] | null, setPosition: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function ReportIncident() {
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const all = JSON.parse(localStorage.getItem('mockIncidents') || '[]');
    const newIncident = {
      id: all.length > 0 ? Math.max(...all.map((i:any) => i.id)) + 1 : 1,
      type,
      details,
      location,
      status: 'รอการตอบสนอง',
      email: user.email || '',
      fileName: file ? file.name : undefined,
      note: '',
      lat: mapPosition ? mapPosition[0] : undefined,
      lng: mapPosition ? mapPosition[1] : undefined,
      date: new Date().toISOString()
    };
    all.push(newIncident);
    localStorage.setItem('mockIncidents', JSON.stringify(all));
    alert('ส่งข้อมูลแจ้งเหตุสำเร็จ!');
    setType('');
    setDetails('');
    setLocation('');
    setFile(null);
    setMapPosition(null);
    navigate('/my-incidents');
  };

  return (
    <div className="report-incident-container">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#e74c3c', fontSize: 28 }}><i className="fas fa-exclamation-triangle"></i></span>
        แจ้งเหตุฉุกเฉิน
      </h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>ประเภทเหตุฉุกเฉิน *</div>
        <div className="incident-type-grid">
          {incidentTypes.map((t) => (
            <button
              type="button"
              key={t.value}
              className={`incident-type-btn${type === t.value ? ' selected' : ''}`}
              onClick={() => setType(t.value)}
            >
              <div className="incident-type-icon">
                <i className={t.icon} style={{ fontSize: 36, color: '#444' }}></i>
              </div>
              <div style={{ fontWeight: 600 }}>{t.label}</div>
            </button>
          ))}
        </div>
        <input type="hidden" value={type} required readOnly />

        <div className="form-group">
          <label>รายละเอียดเหตุการณ์ *</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="อธิบายเหตุการณ์อย่างละเอียด"
            required
          />
        </div>

        <div className="form-group incident-location-row">
          <div style={{ flex: 1 }}>
            <label>สถานที่เกิดเหตุ *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="เช่น อาคารเรียน อาคารหอพัก"
              required
            />
          </div>
          <div style={{ flex: 1, marginLeft: 24 }}>
            <label>แผนที่</label>
            <div style={{ height: 200, borderRadius: 10, overflow: 'hidden' }}>
              <MapContainer center={[16.4322, 102.8236]} zoom={16} style={{ height: '200px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker position={mapPosition} setPosition={setMapPosition} />
              </MapContainer>
            </div>
            <div style={{ color: '#888', marginTop: 8, fontSize: 13 }}>
              {mapPosition
                ? `ละติจูด: ${mapPosition[0].toFixed(6)}, ลองจิจูด: ${mapPosition[1].toFixed(6)}`
                : 'คลิกบนแผนที่เพื่อเลือกจุดเกิดเหตุ'}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>แนบไฟล์/ภาพถ่าย (ถ้ามี)</label>
          <div className="attachment-box">
            <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
            <div style={{ color: '#888', fontSize: 15, marginTop: 8 }}>
              รองรับ JPG, PNG, PDF (สูงสุด 10MB)
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <i className="fas fa-paper-plane"></i> ส่งเหตุฉุกเฉิน
        </button>
      </form>
    </div>
  );
}
