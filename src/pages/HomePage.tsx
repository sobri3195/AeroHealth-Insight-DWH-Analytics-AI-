import { Bed, Clock, Award, TrendingUp } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/KPIWidget';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useKPIOverview } from '@/hooks/useKPIOverview';
import { formatDate } from '@/utils/format';
import { DATE_FORMATS } from '@/config/constants';

export function HomePage() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const { data, isLoading, error } = useKPIOverview({
    from: formatDate(thirtyDaysAgo, DATE_FORMATS.API),
    to: formatDate(today, DATE_FORMATS.API),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">
          Gagal memuat data. Silakan coba lagi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ringkasan KPI</h1>
        <p className="text-gray-600 mt-2">
          Data terakhir diperbarui: {data?.lastRefresh ? formatDate(data.lastRefresh) : '-'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.metrics.bor && (
          <KPIWidget
            title="Bed Occupancy Rate (BOR)"
            metric={data.metrics.bor}
            icon={<Bed className="h-8 w-8" />}
          />
        )}
        {data?.metrics.alos && (
          <KPIWidget
            title="Average Length of Stay (ALOS)"
            metric={data.metrics.alos}
            icon={<Clock className="h-8 w-8" />}
          />
        )}
        {data?.metrics.bedTurnover && (
          <KPIWidget
            title="Bed Turnover"
            metric={data.metrics.bedTurnover}
            icon={<TrendingUp className="h-8 w-8" />}
          />
        )}
        {data?.metrics.edTAT && (
          <KPIWidget
            title="ED TAT (Rata-rata)"
            metric={data.metrics.edTAT}
            icon={<Award className="h-8 w-8" />}
          />
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Selamat Datang di AeroHealth Insight
        </h2>
        <p className="text-blue-800">
          Platform analitik kesehatan terpadu dengan data warehouse untuk mendukung
          keputusan operasional dan strategis berbasis data.
        </p>
      </div>
    </div>
  );
}
