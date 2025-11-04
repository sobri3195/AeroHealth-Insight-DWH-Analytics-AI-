import { apiService } from './api';
import { EDMetrics, AncillaryMetrics } from '@/types';

export interface OpsQueryParams {
  facilityId?: string;
  from: string;
  to: string;
}

export interface AncillaryQueryParams extends OpsQueryParams {
  serviceType?: 'LAB' | 'RADIOLOGY' | 'PHARMACY';
}

export const opsService = {
  getEDMetrics: (params: OpsQueryParams) =>
    apiService.get<EDMetrics>('/api/ops/ed/metrics', { params }),

  getAncillaryMetrics: (params: AncillaryQueryParams) =>
    apiService.get<AncillaryMetrics>('/api/ops/ancillary/metrics', { params }),
};
