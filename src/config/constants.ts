export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.aerohealth.mil/v1';

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  CAPACITY: '/capacity',
  OPS: '/ops',
  QUALITY: '/quality',
  FINANCE: '/finance',
  EPI: '/epi',
  PERSONNEL_RISK: '/personnel-risk',
  EXPLORE: '/explore',
  CATALOG: '/catalog',
  ADMIN: '/admin',
} as const;

export const PERFORMANCE = {
  LCP_TARGET: 2500,
  QUERY_CACHE_TIME: 5 * 60 * 1000,
  QUERY_STALE_TIME: 2 * 60 * 1000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 10000,
} as const;

export const FORECAST_HORIZON = {
  DEFAULT: 14,
  MIN: 1,
  MAX: 30,
} as const;

export const SLA_THRESHOLDS = {
  ED: {
    DOOR_TO_DOCTOR: 30,
    DOOR_TO_DISPOSITION: 120,
  },
  LAB: {
    ROUTINE: 120,
    STAT: 30,
  },
  RADIOLOGY: {
    ROUTINE: 180,
    STAT: 60,
  },
  PHARMACY: {
    ROUTINE: 45,
    STAT: 15,
  },
} as const;

export const ALERT_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

export const SYNDROMIC_SURVEILLANCE = {
  ILI: 'Influenza-Like Illness',
  ISPA: 'Infeksi Saluran Pernapasan Akut',
  DIARRHEA: 'Diare',
  ALL: 'Semua Sindrom',
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'dd MMM yyyy HH:mm',
} as const;

export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#6366f1',
  NEUTRAL: '#6b7280',
} as const;
