# AeroHealth Insight

Healthcare Analytics & Data Warehouse Platform - React Frontend Application

## 📋 Deskripsi

AeroHealth Insight adalah platform dashboard analitik kesehatan berbasis React yang membaca dari data warehouse/lakehouse terpusat (SIMRS, BPJS, logistik, HR, IoT). Platform ini menyediakan KPI operasional, prediksi okupansi/LOS, early warning epidemiologi, risk scoring PTM personel, dan self-service analytics dengan governance ketat.

## 🎯 Tujuan & Prinsip

- **Decision-first**: Metrik yang langsung mendorong keputusan operasional & strategis
- **Satu sumber kebenaran (SSOT)**: Skema terstandar, kamus data bersama
- **Explainable AI**: Model prediksi transparan, metrik performa jelas
- **Governance & keamanan**: Akses berbasis peran, data lineage, audit lengkap

## 🏗️ Arsitektur

### Lapisan Arsitektur (High-Level)

1. **Ingestion** (backend/layer data): Konektor SIMRS, BPJS (VClaim/INACBG), LIS logistik, HR, IoT
2. **Storage**: Lakehouse (parquet/iceberg/delta) + DWH star schema
3. **Semantics**: Kamus data (glosarium), metrics layer (definisi BOR, LOS, TAT)
4. **Serving API**: GraphQL/REST untuk dashboard, endpoint prediksi/AI
5. **Frontend (React)**: AeroHealth Insight (role-based dashboards + explorasi)

### Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Validation**: Zod

## 👥 Peran Pengguna & Akses

| Peran | Akses |
|-------|-------|
| **Pimpinan RS/Komandan** | Ringkasan KPI, tren, prediksi beban |
| **Kepala Unit** | KPI unit, bottleneck, tindakan korektif |
| **Analis Mutu/Keuangan** | Mutu klinis, coding, klaim, revenue cycle |
| **Epidemiolog/Prevention** | Syndromic surveillance, outbreak alert |
| **Auditor/IT Data Steward** | Lineage, kualitas data, policy enforcement |

## 📱 Modul Frontend

- `/login` - SSO, MFA, just-in-time provisioning
- `/` (home) - Ringkasan KPI lintas fasilitas, alert terbaru
- `/capacity` - BOR, prediksi BOR/LOS 14 hari, what-if skenario
- `/ops` - TAT IGD, TAT lab/rad/farmasi, antrian, SLA breach
- `/quality` - Kepatuhan clinical pathway, readmission, mortalitas
- `/finance` - Pendapatan, biaya, payer mix, klaim (lulus/blokir)
- `/epi` - Early warning: ILI, diare, ISPA, heat risk, peta & threshold
- `/personnel-risk` - Risk scoring PTM untuk personel (agregat, non-PII)
- `/explore` - Self-service analytics: pivot, filter, simpan view
- `/catalog` - Kamus data, definisi KPI, last refresh, lineage
- `/admin` - Manajemen akses, data retention, pengaturan threshold

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=https://api.aerohealth.mil/v1
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
npm run format           # Format code with Prettier

# Testing
npm run test             # Run unit tests
npm run test:ui          # Run tests with UI
npm run test:e2e         # Run E2E tests
```

## 📂 Struktur Direktori

```
src/
├── components/          # React components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
│   ├── constants.ts    # App constants
│   └── permissions.ts  # RBAC/ABAC permissions
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main App component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔒 Keamanan & Privasi

- **RBAC/ABAC**: Akses per peran, scope fasilitas
- **Data di UI**: Agregat/anonymized, tanpa identitas pasien
- **TLS, CSP, HSTS**: Token binding, refresh token rotation
- **Audit log**: Siapa melihat apa (metric/view), tamper-evident
- **Data retention**: Purge sesuai kebijakan, consent boundaries

## 📊 Kontrak API

API contract tersedia dalam format OpenAPI 3.0 di file `api-contract.yaml`.

### Endpoint Utama

- `GET /api/kpi/overview` - KPI ringkas
- `GET /api/capacity/metrics` - Metrik kapasitas
- `GET /api/ops/ed/metrics` - Metrik IGD
- `GET /api/finance/claims/summary` - Ringkasan klaim
- `GET /api/epi/syndromic` - Data surveilans sindromik
- `POST /api/explore/query` - Query self-service
- `GET /api/catalog/metrics` - Definisi metrik
- `GET /ml/forecast/census` - Prediksi okupansi

Semua endpoint mematuhi RLS (row-level security) & audit.

## ⚡ Kinerja & Reliabilitas

- **Target**: LCP < 2.5s untuk halaman utama
- **Lazy loading**: Modul berat (peta, pivot)
- **Caching**: React Query dengan background revalidation
- **Graceful degradation**: Fallback jika layanan ML tidak tersedia

## 📈 Observabilitas & QA

- Telemetri UI: waktu render, error, drop-off pengguna
- Uji: snapshot komponen KPI, e2e untuk drilldown & simpan view
- Validasi model: tampilkan RMSE/MAE & tanggal last training
- Feature flags untuk modul ML/epi sebelum general availability

## ✅ Acceptance Criteria

- [x] Dashboard Home memuat KPI < 2.5 dtk (cache hangat)
- [x] Capacity menampilkan prediksi 14 hari dengan MAE ≤ 15%
- [x] Ops menandai SLA breach dengan drilldown
- [x] Finance menampilkan klaim blokir & alasan top-5
- [x] Epi memunculkan alert ketika melewati ambang
- [x] Explore menyimpan view dan menghormati RLS
- [x] Catalog menampilkan lineage & freshness
- [x] Semua akses & tindakan terekam audit
- [x] Tidak ada data identitas pasien di UI

## 📝 Deliverables

- [x] Peta rute & komponen + wireframe 6 halaman utama
- [x] Definisi KPI (glosarium, rumus, filter standar)
- [x] Spesifikasi API (OpenAPI) + Postman collection ready
- [x] Desain keamanan (RBAC/ABAC, RLS, audit)
- [x] Strategi caching & paginasi untuk dataset besar
- [x] Dokumentasi what-if simulator (asumsi & batasan)
- [ ] Rencana rollout (pilot 1–2 RS, metrik keberhasilan)

## 🤝 Contributing

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Proprietary - AeroHealth Platform © 2024

## 📧 Contact

AeroHealth API Team - api@aerohealth.mil

---

**Platform keamanan tinggi untuk analitik kesehatan berbasis data.**
