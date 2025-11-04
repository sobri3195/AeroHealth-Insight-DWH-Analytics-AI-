import { Card } from '@/components/ui/Card';

export function EpiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Epidemiologi & Surveillance</h1>
        <p className="text-gray-600 mt-2">
          Early warning system dan outbreak detection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Syndromic Surveillance" subtitle="ILI, ISPA, Diare">
          <p className="text-gray-500">
            Time series dengan z-score threshold dan anomaly detection akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Environmental Monitoring" subtitle="Heat index & IoT sensors">
          <p className="text-gray-500">
            Monitoring suhu dan kelembaban untuk aktivitas lapangan akan ditampilkan di sini.
          </p>
        </Card>
      </div>
    </div>
  );
}
