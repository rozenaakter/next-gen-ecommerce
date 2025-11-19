// types/user.ts - CREATE NEW FILE
export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  role: 'ADMIN' | 'CUSTOMER' | 'STAFF';
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: {
    address?: string;
    phone?: string;
  };
}

export type UserRole = 'ADMIN' | 'CUSTOMER' | 'STAFF';