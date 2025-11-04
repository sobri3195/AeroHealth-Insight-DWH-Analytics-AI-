import { Card } from '@/components/ui/Card';

export function ExplorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Self-Service Analytics</h1>
        <p className="text-gray-600 mt-2">
          Eksplorasi data dengan pivot table dan custom query
        </p>
      </div>

      <Card title="Query Builder" subtitle="Pilih dimensi dan measures untuk analisis">
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Dimensions</p>
            <p className="text-sm text-gray-500">
              Pilih: Fasilitas, Tanggal, Layanan, Payer, dll.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Measures</p>
            <p className="text-sm text-gray-500">
              Pilih: Patient Count, Revenue, ALOS, TAT, dll.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              ✓ Row-level security (RLS) diterapkan<br />
              ✓ Ekspor CSV non-PII tersedia<br />
              ✓ Simpan view untuk dibagikan
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
