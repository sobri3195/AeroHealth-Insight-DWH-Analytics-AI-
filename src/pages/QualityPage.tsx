import { Card } from '@/components/ui/Card';

export function QualityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mutu & Keselamatan</h1>
        <p className="text-gray-600 mt-2">
          Indikator mutu klinis dan keselamatan pasien
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Clinical Pathway" subtitle="Kepatuhan terhadap panduan klinis">
          <p className="text-gray-500">
            Compliance rate per diagnosis akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Readmission Rate" subtitle="7 dan 30 hari (risk-adjusted)">
          <p className="text-gray-500">
            Tren readmission dengan analisis root cause akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Mortalitas" subtitle="Standardized Mortality Ratio">
          <p className="text-gray-500">
            SMR dengan benchmark nasional akan ditampilkan di sini.
          </p>
        </Card>
      </div>
    </div>
  );
}
