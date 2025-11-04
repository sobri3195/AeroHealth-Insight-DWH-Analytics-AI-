import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { useCapacityMetrics, useCensusForecast } from '@/hooks/useCapacity';
import { formatDate } from '@/utils/format';
import { DATE_FORMATS, FORECAST_HORIZON } from '@/config/constants';

export function CapacityPage() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const [selectedFacility] = useState<string>('');

  const { data: metricsData, isLoading: metricsLoading } = useCapacityMetrics({
    from: formatDate(thirtyDaysAgo, DATE_FORMATS.API),
    to: formatDate(today, DATE_FORMATS.API),
    facilityId: selectedFacility || undefined,
  });

  const { data: forecastData, isLoading: forecastLoading } = useCensusForecast({
    facilityId: selectedFacility || 'ALL',
    horizon: FORECAST_HORIZON.DEFAULT,
  });

  if (metricsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Kapasitas</h1>
        <p className="text-gray-600 mt-2">
          Monitoring dan prediksi kapasitas tempat tidur
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metricsData?.metrics.bor && (
          <TrendChart
            title="Bed Occupancy Rate (BOR)"
            subtitle="Tingkat okupansi 30 hari terakhir"
            data={metricsData.metrics.bor}
          />
        )}
        {metricsData?.metrics.alos && (
          <TrendChart
            title="Average Length of Stay"
            subtitle="Rata-rata lama rawat inap"
            data={metricsData.metrics.alos}
          />
        )}
      </div>

      <Card
        title="Prediksi Okupansi 14 Hari"
        subtitle={
          forecastData
            ? `Model: ${forecastData.model.name} (MAE: ${forecastData.model.metrics.mae.toFixed(2)})`
            : undefined
        }
      >
        {forecastLoading ? (
          <LoadingSpinner />
        ) : forecastData ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Model dilatih pada: {formatDate(forecastData.model.trainedAt)}</p>
              <p>Metrik performa:</p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>MAE: {forecastData.model.metrics.mae.toFixed(2)}</li>
                <li>RMSE: {forecastData.model.metrics.rmse.toFixed(2)}</li>
                <li>MAPE: {forecastData.model.metrics.mape.toFixed(2)}%</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm text-blue-800">
                Prediksi menunjukkan {forecastData.forecast.length} hari ke depan dengan
                confidence interval. Data dapat digunakan untuk perencanaan kapasitas.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Pilih fasilitas untuk melihat prediksi
          </p>
        )}
      </Card>
    </div>
  );
}
