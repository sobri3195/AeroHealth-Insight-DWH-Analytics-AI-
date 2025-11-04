import { Card } from '@/components/ui/Card';

export function CatalogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Catalog</h1>
        <p className="text-gray-600 mt-2">
          Kamus data, definisi KPI, dan data lineage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Metric Definitions" subtitle="Glosarium dan formula KPI">
          <div className="space-y-3">
            <div className="border-b pb-3">
              <p className="font-medium text-gray-900">BOR (Bed Occupancy Rate)</p>
              <p className="text-sm text-gray-600 mt-1">
                Formula: (Hari perawatan / (Tempat tidur × Hari dalam periode)) × 100%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sumber: fact_admissions, dim_beds
              </p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium text-gray-900">ALOS (Average Length of Stay)</p>
              <p className="text-sm text-gray-600 mt-1">
                Formula: Total hari perawatan / Total discharge
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sumber: fact_admissions
              </p>
            </div>
          </div>
        </Card>

        <Card title="Data Lineage" subtitle="Pelacakan sumber data ke metrik">
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700">Data Sources</p>
              <p className="text-xs text-gray-500 mt-1">
                SIMRS → Staging → Transform → DWH Star Schema → Metrics Layer
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-medium text-green-700">Data Quality Score</p>
              <ul className="text-xs text-green-600 mt-2 space-y-1">
                <li>Completeness: 98.5%</li>
                <li>Consistency: 97.2%</li>
                <li>Duplicate Ratio: 0.3%</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
