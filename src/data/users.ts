// Archivo: data/users.ts - Datos de prueba para usuarios

export interface UserDevocion {
  id: number;
  title: string;
  content: string;
}

export interface UserData {
  uid: string;
  name: string;
  email: string;
  accessDate: string;
  plan: 'basico' | 'premium';
  devocoes: UserDevocion[];
}

export interface UsersDataMap {
  [uid: string]: UserData;
}

const usersData: UsersDataMap = {
  'abc123def456': {
    uid: 'abc123def456',
    name: 'João Silva',
    email: 'joao@email.com',
    accessDate: '2025-12-20',
    plan: 'basico',
    devocoes: [
      { id: 1, title: 'Devoção 1', content: '...' },
      { id: 2, title: 'Devoção 2', content: '...' }
    ]
  },
  'xyz789abc456': {
    uid: 'xyz789abc456',
    name: 'Maria Santos',
    email: 'maria@email.com',
    accessDate: '2025-12-20',
    plan: 'basico',
    devocoes: [
      { id: 1, title: 'Devoção 1', content: '...' }
    ]
  }
};

export default usersData;
