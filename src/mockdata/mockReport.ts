// mock.ts - mock data สำหรับ incidents ใช้ได้ทั้งฝั่ง page และ page-staff

export interface IncidentMock {
  id: number;
  type: string;
  details: string;
  location: string;
  status: 'รอการตอบสนอง' | 'กำลังดำเนินการ' | 'เสร็จสิ้น';
  email: string;
  fileName?: string;
  note?: string;
  lat?: number;
  lng?: number;
  date?: string;
}

export const mockIncidents: IncidentMock[] = [
  {
    id: 1,
    type: 'อุบัติเหตุ',
    details: 'นักศึกษาล้มบาดเจ็บที่สนามกีฬา',
    location: 'สนามกีฬา มข.',
    status: 'รอการตอบสนอง',
    email: 'student1@example.com',
    fileName: 'accident.jpg',
    note: '',
    lat: 13.7563,
    lng: 100.5018,
    date: '2024-06-01T09:00:00.000Z'
  },
  {
    id: 2,
    type: 'ไฟไหม้',
    details: 'เกิดไฟไหม้ห้องพักชั้น 3 หอใน',
    location: 'หอพัก 3',
    status: 'กำลังดำเนินการ',
    email: 'student2@example.com',
    fileName: '',
    note: '',
    lat: 13.7563,
    lng: 100.5018,
    date: '2024-06-02T14:30:00.000Z'
  },
  {
    id: 3,
    type: 'ทะเลาะวิวาท',
    details: 'นักศึกษาทะเลาะกันหน้าโรงอาหาร',
    location: 'โรงอาหารกลาง',
    status: 'เสร็จสิ้น',
    email: 'student3@example.com',
    fileName: '',
    note: 'แจ้ง รปภ. เรียบร้อย',
    lat: 13.7563,
    lng: 100.5018,
    date: '2024-06-03T11:15:00.000Z'
  },
  {
    id: 4,
    type: 'เจ็บป่วย',
    details: 'นักศึกษามีอาการชักในห้องเรียน',
    location: 'อาคารเรียนรวม 2',
    status: 'รอการตอบสนอง',
    email: 'student4@example.com',
    fileName: '',
    note: '',
    lat: 13.7563,
    lng: 100.5018,
    date: '2024-06-04T08:45:00.000Z'
  },
  {
    id: 5,
    type: 'เหตุรุนแรง',
    details: 'พบการทะเลาะวิวาทในลานจอดรถ',
    location: 'ลานจอดรถหน้าตึกวิทยาศาสตร์',
    status: 'กำลังดำเนินการ',
    email: 'student5@example.com',
    fileName: '',
    note: '',
    lat: 13.7563,
    lng: 100.5018,
    date: '2024-06-05T16:20:00.000Z'
  }
]; 