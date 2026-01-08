
export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string; // Thumbnail/Cover
  images?: string[]; // Galeri tambahan
  category: string;
}

export interface VisitorData {
  date: string;
  count: number;
}

export interface CompanyProfile {
  name: string;
  description: string;
  vision: string;
  mission: string[];
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram?: string;
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR'
}
