import { useQuery } from '@tanstack/react-query';
import { kpiService, KPIQueryParams } from '@/services';
import { PERFORMANCE } from '@/config/constants';

export function useKPIOverview(params: KPIQueryParams) {
  return useQuery({
    queryKey: ['kpi', 'overview', params],
    queryFn: () => kpiService.getOverview(params),
    staleTime: PERFORMANCE.QUERY_STALE_TIME,
    gcTime: PERFORMANCE.QUERY_CACHE_TIME,
  });
}
