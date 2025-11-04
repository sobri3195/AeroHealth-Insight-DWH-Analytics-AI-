import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/types';
import { formatDateTime } from '@/utils/format';
import { cn } from '@/utils/cn';

interface AlertCenterProps {
  alerts: Alert[];
  maxDisplay?: number;
}

export function AlertCenter({ alerts, maxDisplay = 5 }: AlertCenterProps) {
  const displayAlerts = alerts.slice(0, maxDisplay);

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return <AlertTriangle className="h-5 w-5" />;
      case 'MEDIUM':
        return <AlertCircle className="h-5 w-5" />;
      case 'LOW':
        return <Info className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'HIGH':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW':
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card title="Pusat Alert" subtitle={`${alerts.length} alert aktif`}>
      <div className="space-y-3">
        {displayAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Info className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Tidak ada alert aktif</p>
          </div>
        ) : (
          displayAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                'p-4 rounded-lg border flex items-start gap-3',
                getSeverityColor(alert.severity)
              )}
            >
              {getSeverityIcon(alert.severity)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm uppercase">{alert.type}</span>
                  <span className="text-xs">•</span>
                  <span className="text-xs">{alert.severity}</span>
                </div>
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs mt-1 opacity-75">{formatDateTime(alert.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
