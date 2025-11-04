import { Card } from '@/components/ui/Card';

export function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administrasi</h1>
        <p className="text-gray-600 mt-2">
          Manajemen akses, threshold, dan kebijakan data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Access Management" subtitle="RBAC & ABAC policies">
          <p className="text-gray-500">
            Konfigurasi role-based dan attribute-based access control akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Alert Thresholds" subtitle="Konfigurasi ambang batas">
          <p className="text-gray-500">
            Pengaturan threshold untuk early warning system akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Data Retention" subtitle="Kebijakan penyimpanan data">
          <p className="text-gray-500">
            Aturan retention dan purge sesuai compliance akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Audit Log" subtitle="Tracking akses dan tindakan">
          <p className="text-gray-500">
            Log tamper-evident siapa melihat apa dan kapan akan ditampilkan di sini.
          </p>
        </Card>
      </div>
    </div>
  );
}
