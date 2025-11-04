import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { MetricValue } from '@/types';
import { formatMetricValue } from '@/utils/format';
import { cn } from '@/utils/cn';

interface KPIWidgetProps {
  title: string;
  metric: MetricValue;
  icon?: React.ReactNode;
  className?: string;
}

export function KPIWidget({ title, metric, icon, className }: KPIWidgetProps) {
  const getTrendIcon = () => {
    if (!metric.change) return <Minus className="h-4 w-4" />;
    return metric.change > 0 ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const getTrendColor = () => {
    if (!metric.change) return 'text-gray-500';
    return metric.change > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatMetricValue(metric.value, metric.unit)}
          </p>
          {metric.change !== undefined && (
            <div className={cn('flex items-center mt-2 text-sm', getTrendColor())}>
              {getTrendIcon()}
              <span className="ml-1">
                {Math.abs(metric.change).toFixed(1)}
                {metric.changePercent && ` (${metric.changePercent.toFixed(1)}%)`}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-blue-600 opacity-80">{icon}</div>}
      </div>
    </Card>
  );
}
