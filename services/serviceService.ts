
import { Service } from '../types';

const SERVICES_KEY = 'company_test_services';

const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Digital Strategy',
    description: 'Kami membantu bisnis merancang peta jalan transformasi digital yang terukur dan berorientasi pada hasil nyata.',
    icon: '🎯'
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Menciptakan antarmuka yang estetis dan pengalaman pengguna yang intuitif untuk meningkatkan konversi.',
    icon: '🎨'
  },
  {
    id: '3',
    title: 'Cloud Solutions',
    description: 'Implementasi infrastruktur cloud yang aman, scalable, dan efisien untuk mendukung operasional bisnis modern.',
    icon: '☁️'
  },
  {
    id: '4',
    title: 'AI Development',
    description: 'Pemanfaatan kecerdasan buatan untuk otomatisasi proses dan pengambilan keputusan berbasis data.',
    icon: '🤖'
  }
];

export const getServices = (): Service[] => {
  const stored = localStorage.getItem(SERVICES_KEY);
  if (!stored) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
    return DEFAULT_SERVICES;
  }
  return JSON.parse(stored);
};

export const addService = (service: Omit<Service, 'id'>) => {
  const services = getServices();
  const newService = { ...service, id: Date.now().toString() };
  services.push(newService);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  return newService;
};

export const updateService = (updated: Service) => {
  const services = getServices();
  const index = services.findIndex(s => s.id === updated.id);
  if (index !== -1) {
    services[index] = updated;
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  }
};

export const deleteService = (id: string) => {
  const services = getServices().filter(s => s.id !== id);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};
