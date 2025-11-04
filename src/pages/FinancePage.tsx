import { Card } from '@/components/ui/Card';

export function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Keuangan & Klaim</h1>
        <p className="text-gray-600 mt-2">
          Revenue cycle, payer mix, dan analisis klaim BPJS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue & Payer Mix" subtitle="Pendapatan dan komposisi payer">
          <p className="text-gray-500">
            Breakdown revenue per payer dan service line akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Klaim BPJS" subtitle="Approval, denial, dan leakage">
          <p className="text-gray-500">
            Analisis denial reasons dan missing charge akan ditampilkan di sini.
          </p>
        </Card>
      </div>
    </div>
  );
}
