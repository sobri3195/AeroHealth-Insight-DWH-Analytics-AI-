# Definisi KPI - AeroHealth Insight

## 📊 Kamus KPI dan Metrik

### Kapasitas (Capacity)

#### BOR (Bed Occupancy Rate)
- **Definisi**: Persentase tempat tidur yang terisi dalam periode tertentu
- **Formula**: `(Jumlah hari perawatan / (Jumlah tempat tidur × Hari dalam periode)) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_admissions`, `dim_beds`, `dim_time`
- **Target**: 60-85% (standar WHO)
- **Interpretasi**:
  - < 60%: Kapasitas kurang dimanfaatkan
  - 60-85%: Optimal
  - > 85%: Risiko overcrowding

#### ALOS (Average Length of Stay)
- **Definisi**: Rata-rata lama rawat inap pasien
- **Formula**: `Total hari perawatan / Total discharge`
- **Unit**: Hari
- **Sumber Data**: `fact_admissions`
- **Target**: Bervariasi per diagnosis
- **Interpretasi**: ALOS tinggi → efisiensi rendah atau case-mix berat

#### Bed Turnover
- **Definisi**: Frekuensi pergantian pasien per tempat tidur
- **Formula**: `Total discharge / Jumlah tempat tidur`
- **Unit**: Rasio
- **Sumber Data**: `fact_admissions`, `dim_beds`
- **Target**: > 30-40 per tahun
- **Interpretasi**: Turnover tinggi → efisiensi tinggi (jika BOR optimal)

---

### Operasional (Operations)

#### Door-to-Doctor Time (ED)
- **Definisi**: Waktu dari kedatangan pasien sampai dilihat dokter
- **Formula**: `AVG(timestamp_doctor_seen - timestamp_arrival)`
- **Unit**: Menit
- **Sumber Data**: `fact_ed_visits`
- **SLA Target**: ≤ 30 menit
- **Severity**: 
  - Warning: > 30 menit
  - Critical: > 60 menit

#### Door-to-Disposition Time (ED)
- **Definisi**: Waktu dari kedatangan sampai keputusan disposisi
- **Formula**: `AVG(timestamp_disposition - timestamp_arrival)`
- **Unit**: Menit
- **Sumber Data**: `fact_ed_visits`
- **SLA Target**: ≤ 120 menit
- **Interpretasi**: Termasuk pemeriksaan, diagnostik, dan keputusan

#### LWBS (Left Without Being Seen)
- **Definisi**: Persentase pasien yang pergi sebelum dilihat dokter
- **Formula**: `(Jumlah LWBS / Total kunjungan ED) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_ed_visits`
- **Target**: < 2%
- **Root Cause**: Antrian panjang, staffing inadequate

#### TAT Lab/Radiologi/Farmasi
- **Definisi**: Turn-around time layanan penunjang
- **Formula**: `AVG(timestamp_result - timestamp_order)`
- **Unit**: Menit
- **Sumber Data**: `fact_lab_orders`, `fact_rad_orders`, `fact_pharmacy_orders`
- **SLA Targets**:
  - Lab Routine: ≤ 120 menit
  - Lab STAT: ≤ 30 menit
  - Radiologi Routine: ≤ 180 menit
  - Radiologi STAT: ≤ 60 menit
  - Farmasi Routine: ≤ 45 menit
  - Farmasi STAT: ≤ 15 menit

---

### Mutu (Quality)

#### Clinical Pathway Compliance
- **Definisi**: Kepatuhan terhadap panduan klinis per diagnosis
- **Formula**: `(Jumlah kasus patuh / Total kasus) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_admissions`, `fact_orders`, `dim_clinical_pathways`
- **Target**: > 80%
- **Manfaat**: Outcome lebih baik, biaya terkendali

#### Readmission Rate (7-day & 30-day)
- **Definisi**: Pasien yang kembali dirawat dalam 7/30 hari
- **Formula**: `(Jumlah readmission / Total discharge) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_admissions`
- **Target**: 
  - 7-day: < 3%
  - 30-day: < 8%
- **Note**: Adjusted untuk risiko (case-mix)

#### SMR (Standardized Mortality Ratio)
- **Definisi**: Rasio mortalitas observasi vs ekspektasi
- **Formula**: `Observed deaths / Expected deaths`
- **Unit**: Rasio
- **Sumber Data**: `fact_admissions`, `dim_mortality_risk_scores`
- **Target**: ≤ 1.0
- **Interpretasi**:
  - SMR < 1: Better than expected
  - SMR = 1: As expected
  - SMR > 1: Worse than expected

---

### Keuangan (Finance)

#### Total Revenue
- **Definisi**: Total pendapatan dalam periode
- **Formula**: `SUM(revenue_amount)`
- **Unit**: IDR
- **Sumber Data**: `fact_revenue`
- **Breakdown**: Per payer, per service line

#### Payer Mix
- **Definisi**: Komposisi sumber pembayaran
- **Formula**: `(Revenue per payer / Total revenue) × 100%`
- **Unit**: Persentage (%)
- **Sumber Data**: `fact_revenue`, `dim_payers`
- **Kategori**: BPJS, Asuransi Swasta, Out-of-Pocket, Jaminan Perusahaan

#### Claim Approval Rate (BPJS)
- **Definisi**: Persentase klaim yang disetujui
- **Formula**: `(Approved claims / Total submitted claims) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_claims`
- **Target**: > 95%

#### Claim Denial Rate
- **Definisi**: Persentase klaim yang ditolak
- **Formula**: `(Denied claims / Total submitted claims) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_claims`
- **Target**: < 5%
- **Top Denial Reasons**: Coding error, non-covered services, documentation incomplete

#### Revenue Cycle Leakage
- **Definisi**: Pendapatan hilang karena missing charge
- **Formula**: `Orders tanpa tindakan - Tindakan tanpa billing`
- **Unit**: IDR
- **Sumber Data**: `fact_orders`, `fact_procedures`, `fact_billing`
- **Target**: < 2% dari revenue

---

### Epidemiologi (Epidemiology)

#### Syndromic Surveillance Count
- **Definisi**: Jumlah kasus per sindrom (ILI, ISPA, Diare)
- **Formula**: `COUNT(visits) WHERE syndrome = X`
- **Unit**: Jumlah kasus
- **Sumber Data**: `fact_ed_visits`, `fact_outpatient_visits`
- **Threshold**: Dynamic (z-score based)

#### Z-Score (Anomaly Detection)
- **Definisi**: Deviasi standar dari rata-rata historis
- **Formula**: `(Count - Mean) / StdDev`
- **Unit**: Standard deviations
- **Threshold**:
  - Warning: z-score > 2
  - Critical: z-score > 3

#### Heat Index
- **Definisi**: Index suhu dan kelembaban untuk aktivitas lapangan
- **Formula**: `f(temperature, humidity)` - NOAA formula
- **Unit**: Index (°C equivalent)
- **Sumber Data**: IoT sensors
- **Threshold**:
  - Caution: 27-32°C
  - Extreme Caution: 32-41°C
  - Danger: > 41°C

---

### Personel (Personnel Risk)

#### Unit Risk Score
- **Definisi**: Skor risiko PTM agregat per unit
- **Formula**: Composite score dari BMI, BP, compliance
- **Unit**: Score (0-100)
- **Sumber Data**: `fact_medical_checks` (aggregated)
- **Target**: < 30 (low risk)
- **Note**: Data agregat, non-PII

#### Average BMI
- **Definisi**: Rata-rata BMI personel di unit
- **Formula**: `AVG(bmi) WHERE unit_id = X`
- **Unit**: kg/m²
- **Sumber Data**: `fact_medical_checks` (aggregated)
- **Target**: 18.5-24.9 (normal range)

#### Medical Check Compliance
- **Definisi**: Kepatuhan medical check berkala
- **Formula**: `(Jumlah completed / Jumlah due) × 100%`
- **Unit**: Persentase (%)
- **Sumber Data**: `fact_medical_checks`
- **Target**: > 90%

---

## 🔄 Data Freshness

| Kategori | Refresh Frequency | Latency Target |
|----------|-------------------|----------------|
| KPI Overview | Real-time | < 5 minutes |
| Capacity Metrics | Hourly | < 1 hour |
| Ops Metrics | Real-time | < 5 minutes |
| Quality Metrics | Daily | < 24 hours |
| Finance Metrics | Daily | < 24 hours |
| Epi Surveillance | Hourly | < 1 hour |
| ML Forecasts | Daily | Model retrained weekly |

---

## 📐 Rumus Statistik

### Risk-Adjusted Metrics
```
Risk-Adjusted Rate = (Observed / Expected) × Reference Rate
```

### Confidence Intervals (95%)
```
CI = Mean ± (1.96 × SE)
SE = StdDev / sqrt(n)
```

### Moving Average (7-day)
```
MA(t) = (x(t) + x(t-1) + ... + x(t-6)) / 7
```

---

## 📚 Referensi

- **WHO Hospital Standards**: Bed occupancy, staffing ratios
- **KARS (Komisi Akreditasi RS)**: Mutu & keselamatan pasien
- **INA-CBG**: Coding dan klaim BPJS
- **CDC/ECDC**: Syndromic surveillance methodology
- **NOAA**: Heat index calculation

---

**Dokumen ini di-maintain oleh Data Steward Team**
*Last updated: 2024-01-01*
