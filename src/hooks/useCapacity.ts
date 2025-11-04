import { useQuery, useMutation } from '@tanstack/react-query';
import { capacityService, CapacityQueryParams, ForecastQueryParams } from '@/services';
import { WhatIfScenario } from '@/types';
import { PERFORMANCE } from '@/config/constants';

export function useCapacityMetrics(params: CapacityQueryParams) {
  return useQuery({
    queryKey: ['capacity', 'metrics', params],
    queryFn: () => capacityService.getMetrics(params),
    staleTime: PERFORMANCE.QUERY_STALE_TIME,
    gcTime: PERFORMANCE.QUERY_CACHE_TIME,
  });
}

export function useCensusForecast(params: ForecastQueryParams) {
  return useQuery({
    queryKey: ['capacity', 'forecast', params],
    queryFn: () => capacityService.getForecast(params),
    staleTime: PERFORMANCE.QUERY_STALE_TIME,
    gcTime: PERFORMANCE.QUERY_CACHE_TIME,
    enabled: !!params.facilityId,
  });
}

export function useWhatIfScenario() {
  return useMutation({
    mutationFn: (scenario: WhatIfScenario) => capacityService.runWhatIfScenario(scenario),
  });
}
