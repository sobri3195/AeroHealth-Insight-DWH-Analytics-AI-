import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/Card';
import { TimeSeriesMetric } from '@/types';
import { formatDate } from '@/utils/format';
import { CHART_COLORS } from '@/config/constants';

interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: TimeSeriesMetric;
  height?: number;
}

export function TrendChart({ title, subtitle, data, height = 300 }: TrendChartProps) {
  const chartData = data.data.map((point) => ({
    date: formatDate(point.date),
    value: point.value,
  }));

  return (
    <Card title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [value.toFixed(2), data.unit]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.PRIMARY}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.PRIMARY }}
            name={`${title} (${data.unit})`}
          />
        </LineChart>
      </ResponsiveContainer>
      {data.aggregate && (
        <div className="mt-4 flex gap-6 text-sm text-gray-600">
          <div>
            <span className="font-medium">Rata-rata:</span> {data.aggregate.avg.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Min:</span> {data.aggregate.min.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Max:</span> {data.aggregate.max.toFixed(2)}
          </div>
        </div>
      )}
    </Card>
  );
}
