import { apiService } from './api';
import { KPIOverview } from '@/types';

export interface KPIQueryParams {
  facilityId?: string;
  from: string;
  to: string;
}

export const kpiService = {
  getOverview: (params: KPIQueryParams) =>
    apiService.get<KPIOverview>('/api/kpi/overview', { params }),
};
