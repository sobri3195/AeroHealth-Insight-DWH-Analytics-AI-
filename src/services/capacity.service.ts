import { apiService } from './api';
import { CapacityMetrics, CensusForecast, WhatIfScenario, WhatIfResult } from '@/types';

export interface CapacityQueryParams {
  facilityId?: string;
  from: string;
  to: string;
  unitType?: 'ICU' | 'WARD' | 'ED' | 'ALL';
}

export interface ForecastQueryParams {
  facilityId: string;
  horizon?: number;
}

export const capacityService = {
  getMetrics: (params: CapacityQueryParams) =>
    apiService.get<CapacityMetrics>('/api/capacity/metrics', { params }),

  getForecast: (params: ForecastQueryParams) =>
    apiService.get<CensusForecast>('/ml/forecast/census', { params }),

  runWhatIfScenario: (scenario: WhatIfScenario) =>
    apiService.post<WhatIfResult>('/ml/whatif/scenario', scenario),
};
