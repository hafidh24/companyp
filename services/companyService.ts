
import { CompanyProfile } from '../types';

const COMPANY_KEY = 'company_test_profile';

const DEFAULT_PROFILE: CompanyProfile = {
  name: 'Company Test',
  description: 'Membangun ekosistem teknologi masa depan melalui solusi inovatif dan desain yang berpusat pada manusia.',
  vision: 'Menjadi pemimpin global dalam transformasi digital yang memberikan dampak nyata bagi masyarakat.',
  mission: [
    'Menyediakan solusi teknologi berkualitas tinggi',
    'Membangun budaya inovasi yang berkelanjutan',
    'Memberikan nilai tambah maksimal bagi klien'
  ],
  address: 'Graha Teknologi Lt. 12, Jl. Jendral Sudirman Kav. 45, Jakarta Selatan, 12190',
  email: 'hello@companytest.id',
  phone: '+62 21 555 0123',
  whatsapp: '628123456789',
  instagram: 'https://instagram.com/companytest'
};

export const getCompanyProfile = (): CompanyProfile => {
  const stored = localStorage.getItem(COMPANY_KEY);
  if (!stored) {
    localStorage.setItem(COMPANY_KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }
  return JSON.parse(stored);
};

export const updateCompanyProfile = (profile: CompanyProfile) => {
  localStorage.setItem(COMPANY_KEY, JSON.stringify(profile));
};
