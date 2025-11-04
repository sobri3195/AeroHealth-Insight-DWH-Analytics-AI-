import { Card } from '@/components/ui/Card';

export function PersonnelRiskPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Risiko Kesehatan Personel</h1>
        <p className="text-gray-600 mt-2">
          Risk scoring PTM personel (data agregat, non-PII)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Indeks Risiko Unit" subtitle="Skor risiko per unit kerja">
          <p className="text-gray-500">
            Agregat BMI, tekanan darah, dan compliance medical check akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Trend Kesehatan" subtitle="Perubahan metrik dari waktu ke waktu">
          <p className="text-gray-500">
            Visualisasi trend improving/stable/declining akan ditampilkan di sini.
          </p>
        </Card>

        <Card title="Program Fitness" subtitle="Partisipasi dan adherence">
          <p className="text-gray-500">
            Metrik keikutsertaan program kesehatan akan ditampilkan di sini.
          </p>
        </Card>
      </div>
    </div>
  );
}
