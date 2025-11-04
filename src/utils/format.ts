import { format, parseISO } from 'date-fns';
import { DATE_FORMATS } from '@/config/constants';

export function formatDate(date: string | Date, formatStr = DATE_FORMATS.DISPLAY): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, DATE_FORMATS.DATETIME);
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatMetricValue(value: number, unit: string): string {
  switch (unit) {
    case '%':
    case 'percent':
      return formatPercent(value);
    case 'IDR':
    case 'currency':
      return formatCurrency(value);
    case 'minutes':
      return `${formatNumber(value)} menit`;
    case 'hours':
      return `${formatNumber(value, 1)} jam`;
    case 'days':
      return `${formatNumber(value, 1)} hari`;
    default:
      return `${formatNumber(value, 2)} ${unit}`;
  }
}
