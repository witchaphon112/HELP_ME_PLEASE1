export interface MockUser {
  email: string;
  password: string;
  user: {
    name: string;
    role: 'staff' | 'student';
    token: string;
    studentId?: string;
    phone?: string;
    address?: string;
  };
}

export const mockUsers: MockUser[] = [
  {
    email: 'staff@example.com',
    password: '123456',
    user: {
      name: 'Staff',
      role: 'staff',
      token: 'mock-token',
      studentId: 'S00001',
      phone: '0812345678',
      address: 'หอพักเจ้าหน้าที่ มข.'
    }
  },
  {
    email: 'student@example.com',
    password: '123456',
    user: {
      name: 'Student',
      role: 'student',
      token: 'mock-token',
      studentId: '65300001',
      phone: '0898765432',
      address: 'หอพักนิสิต 1 มข.'
    }
  }
]; 