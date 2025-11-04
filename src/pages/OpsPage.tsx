import { Card } from '@/components/ui/Card';

export function OpsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Operasional</h1>
        <p className="text-gray-600 mt-2">
          Monitoring performa operasional IGD, Lab, Radiologi, dan Farmasi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="TAT IGD" subtitle="Turn-around time emergency department">
          <p className="text-gray-500">
            Metrik door-to-doctor, door-to-disposition, dan LWBS akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="TAT Layanan Penunjang" subtitle="Lab, Radiologi, Farmasi">
          <p className="text-gray-500">
            Analisis bottleneck dan SLA compliance per shift akan ditampilkan di sini.
          </p>
        </Card>
      </div>
    </div>
  );
}
