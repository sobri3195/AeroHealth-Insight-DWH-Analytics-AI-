# Component Documentation - AeroHealth Insight

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── BrowserRouter
│   ├── LoginPage (Public)
│   └── ProtectedRoute
│       └── DashboardLayout
│           ├── Sidebar
│           ├── Header
│           └── Page Components
│               ├── HomePage
│               ├── CapacityPage
│               ├── OpsPage
│               ├── QualityPage
│               ├── FinancePage
│               ├── EpiPage
│               ├── PersonnelRiskPage
│               ├── ExplorePage
│               ├── CatalogPage
│               └── AdminPage
```

---

## 📦 UI Components

### Card
**Path**: `src/components/ui/Card.tsx`

Reusable card container with optional header.

**Props:**
```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}
```

**Usage:**
```tsx
<Card 
  title="KPI Overview" 
  subtitle="Last 30 days"
  action={<Button>Refresh</Button>}
>
  <p>Card content here</p>
</Card>
```

---

### Button
**Path**: `src/components/ui/Button.tsx`

Styled button with loading state and variants.

**Props:**
```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  // ...extends HTMLButtonElement
}
```

**Variants:**
- `primary`: Blue background (default action)
- `secondary`: Gray background (secondary action)
- `danger`: Red background (destructive action)
- `ghost`: Transparent background (subtle action)

**Usage:**
```tsx
<Button 
  variant="primary" 
  size="md" 
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>
```

---

### LoadingSpinner
**Path**: `src/components/ui/LoadingSpinner.tsx`

Animated loading indicator.

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
<LoadingSpinner size="lg" />
```

---

## 📊 Dashboard Components

### KPIWidget
**Path**: `src/components/dashboard/KPIWidget.tsx`

Displays a single KPI metric with trend indicator.

**Props:**
```typescript
interface KPIWidgetProps {
  title: string;
  metric: MetricValue;
  icon?: React.ReactNode;
  className?: string;
}

interface MetricValue {
  value: number;
  unit: string;
  change?: number;
  changePercent?: number;
}
```

**Features:**
- Displays metric value with unit
- Shows trend (up/down/stable) with icon
- Color-coded: green (increase), red (decrease), gray (no change)
- Optional custom icon

**Usage:**
```tsx
<KPIWidget
  title="Bed Occupancy Rate"
  metric={{
    value: 78.5,
    unit: '%',
    change: 2.3,
    changePercent: 3.0
  }}
  icon={<Bed className="h-8 w-8" />}
/>
```

---

### TrendChart
**Path**: `src/components/dashboard/TrendChart.tsx`

Line chart for time series data using Recharts.

**Props:**
```typescript
interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: TimeSeriesMetric;
  height?: number;
}

interface TimeSeriesMetric {
  data: Array<{ date: string; value: number }>;
  unit: string;
  aggregate?: {
    avg: number;
    min: number;
    max: number;
  };
}
```

**Features:**
- Responsive chart
- Tooltip with formatted values
- Optional aggregates (avg, min, max) displayed below chart
- Customizable height

**Usage:**
```tsx
<TrendChart
  title="BOR Trend"
  subtitle="Last 30 days"
  data={{
    data: [
      { date: '2024-01-01', value: 75 },
      { date: '2024-01-02', value: 78 },
      // ...
    ],
    unit: '%',
    aggregate: { avg: 76.5, min: 70, max: 85 }
  }}
  height={300}
/>
```

---

### AlertCenter
**Path**: `src/components/dashboard/AlertCenter.tsx`

Displays active alerts with severity indicators.

**Props:**
```typescript
interface AlertCenterProps {
  alerts: Alert[];
  maxDisplay?: number;
}

interface Alert {
  id: string;
  type: 'EPI' | 'SLA' | 'CAPACITY' | 'QUALITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  facilityId?: string;
  timestamp: string;
}
```

**Features:**
- Color-coded by severity
- Icon based on severity
- Shows type, message, and timestamp
- Limits display to `maxDisplay` alerts

**Usage:**
```tsx
<AlertCenter 
  alerts={alertList} 
  maxDisplay={5} 
/>
```

---

## 🏗️ Layout Components

### DashboardLayout
**Path**: `src/components/layout/DashboardLayout.tsx`

Main layout wrapper for authenticated pages.

**Props:**
```typescript
interface DashboardLayoutProps {
  children: ReactNode;
}
```

**Structure:**
```
┌─────────────────────────────────────┐
│           Sidebar (left)            │
├─────────────────────────────────────┤
│              Header                 │
├─────────────────────────────────────┤
│                                     │
│          Main Content               │
│          (children)                 │
│                                     │
└─────────────────────────────────────┘
```

**Usage:**
```tsx
<DashboardLayout>
  <HomePage />
</DashboardLayout>
```

---

### Sidebar
**Path**: `src/components/layout/Sidebar.tsx`

Left navigation sidebar with role-based menu items.

**Features:**
- Role-based menu visibility
- Active route highlighting
- Icons for each menu item
- Responsive

**Navigation Items:**
- Beranda (Home)
- Kapasitas (Capacity)
- Operasional (Operations)
- Mutu (Quality)
- Keuangan (Finance)
- Epidemiologi (Epidemiology)
- Risiko Personel (Personnel Risk)
- Eksplorasi (Explore)
- Katalog (Catalog)
- Admin (Admin)

---

### Header
**Path**: `src/components/layout/Header.tsx`

Top header with user info and logout button.

**Features:**
- Displays logged-in user name and role
- Logout button
- Application title and description

---

## 📄 Page Components

### HomePage
**Path**: `src/pages/HomePage.tsx`

Dashboard home page with KPI overview.

**Features:**
- Displays 4 key KPIs (BOR, ALOS, Bed Turnover, ED TAT)
- Shows last refresh timestamp
- Welcome message

**Data Source:**
- API: `GET /api/kpi/overview`
- Hook: `useKPIOverview()`

---

### CapacityPage
**Path**: `src/pages/CapacityPage.tsx`

Capacity management with metrics and forecasts.

**Features:**
- BOR and ALOS trend charts
- 14-day census forecast
- Model performance metrics (MAE, RMSE, MAPE)
- Facility selector

**Data Sources:**
- API: `GET /api/capacity/metrics`
- API: `GET /ml/forecast/census`
- Hooks: `useCapacityMetrics()`, `useCensusForecast()`

---

### OpsPage
**Path**: `src/pages/OpsPage.tsx`

Operational metrics for ED and ancillary services.

**Features (Placeholder):**
- ED TAT metrics
- Lab/Rad/Pharmacy TAT
- SLA breach indicators
- Bottleneck analysis

---

### QualityPage
**Path**: `src/pages/QualityPage.tsx`

Clinical quality and safety indicators.

**Features (Placeholder):**
- Clinical pathway compliance
- Readmission rates
- Standardized mortality ratio
- Incident summary

---

### FinancePage
**Path**: `src/pages/FinancePage.tsx`

Financial metrics and claims management.

**Features (Placeholder):**
- Revenue and payer mix
- Claims approval/denial rates
- Denial reasons breakdown
- Revenue cycle leakage

---

### EpiPage
**Path**: `src/pages/EpiPage.tsx`

Epidemiological surveillance and alerts.

**Features (Placeholder):**
- Syndromic surveillance (ILI, ISPA, Diare)
- Early warning alerts
- Environmental monitoring (heat index)
- Geographic mapping

---

### PersonnelRiskPage
**Path**: `src/pages/PersonnelRiskPage.tsx`

Personnel health risk metrics (aggregate, non-PII).

**Features (Placeholder):**
- Unit-level risk scores
- Health trend indicators
- Fitness program compliance
- Aggregated metrics (BMI, BP)

---

### ExplorePage
**Path**: `src/pages/ExplorePage.tsx`

Self-service analytics interface.

**Features (Placeholder):**
- Dimension and measure selector
- Pivot table / data grid
- Save and share views
- Export to CSV (non-PII)
- Row-level security enforcement

---

### CatalogPage
**Path**: `src/pages/CatalogPage.tsx`

Data dictionary and lineage viewer.

**Features:**
- Metric definitions with formulas
- Data source information
- Data lineage visualization
- Data quality scores
- Last refresh timestamps

---

### AdminPage
**Path**: `src/pages/AdminPage.tsx`

Administration and configuration.

**Features (Placeholder):**
- Access management (RBAC/ABAC)
- Alert threshold configuration
- Data retention policies
- Audit log viewer

---

### LoginPage
**Path**: `src/pages/LoginPage.tsx`

Authentication page.

**Features:**
- Username/password form
- SSO integration placeholder
- MFA placeholder
- Mock authentication for demo

---

## 🎣 Custom Hooks

### useKPIOverview
**Path**: `src/hooks/useKPIOverview.ts`

Fetches KPI overview data.

**Usage:**
```tsx
const { data, isLoading, error } = useKPIOverview({
  from: '2024-01-01',
  to: '2024-01-31',
  facilityId: 'RS_A' // optional
});
```

---

### useCapacityMetrics
**Path**: `src/hooks/useCapacity.ts`

Fetches capacity metrics.

**Usage:**
```tsx
const { data, isLoading } = useCapacityMetrics({
  from: '2024-01-01',
  to: '2024-01-31',
  unitType: 'ICU'
});
```

---

### useCensusForecast
**Path**: `src/hooks/useCapacity.ts`

Fetches census forecast from ML service.

**Usage:**
```tsx
const { data, isLoading } = useCensusForecast({
  facilityId: 'RS_A',
  horizon: 14
});
```

---

### useWhatIfScenario
**Path**: `src/hooks/useCapacity.ts`

Runs what-if scenario simulation (mutation).

**Usage:**
```tsx
const mutation = useWhatIfScenario();

mutation.mutate({
  facilityId: 'RS_A',
  resourceChanges: {
    beds: 10,
    nurses: 5
  }
});
```

---

### usePermissions
**Path**: `src/hooks/usePermissions.ts`

Checks user permissions.

**Usage:**
```tsx
const { checkPermission, checkRouteAccess, userRole } = usePermissions();

if (checkPermission('view:capacity')) {
  // Show capacity module
}

if (checkRouteAccess('/admin')) {
  // Allow access to admin page
}
```

---

## 🗃️ State Management

### useAuthStore
**Path**: `src/store/authStore.ts`

Zustand store for authentication state.

**State:**
```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}
```

**Usage:**
```tsx
const { user, isAuthenticated, login, logout } = useAuthStore();

// Login
login(token, userData);

// Logout
logout();

// Check auth
if (isAuthenticated) {
  // User is logged in
}
```

---

### useUIStore
**Path**: `src/store/uiStore.ts`

Zustand store for UI state.

**State:**
```typescript
interface UIStore {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  selectedFacility: string | null;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSelectedFacility: (facilityId: string | null) => void;
}
```

**Usage:**
```tsx
const { theme, toggleTheme, selectedFacility, setSelectedFacility } = useUIStore();

// Toggle theme
toggleTheme();

// Set facility filter
setSelectedFacility('RS_A');
```

---

## 🛠️ Utility Functions

### format.ts
**Path**: `src/utils/format.ts`

Formatting utilities for dates, numbers, currency.

**Functions:**
- `formatDate(date, format)`: Format dates
- `formatDateTime(date)`: Format date with time
- `formatNumber(value, decimals)`: Format numbers
- `formatPercent(value, decimals)`: Format percentages
- `formatCurrency(value)`: Format IDR currency
- `formatMetricValue(value, unit)`: Smart formatting based on unit

**Usage:**
```tsx
formatDate('2024-01-15'); // '15 Jan 2024'
formatNumber(1234567, 0); // '1.234.567'
formatPercent(78.5, 1); // '78,5%'
formatCurrency(5000000); // 'Rp 5.000.000'
formatMetricValue(78.5, '%'); // '78,5%'
```

---

### cn.ts
**Path**: `src/utils/cn.ts`

Utility for conditional classNames (using clsx).

**Usage:**
```tsx
cn('base-class', condition && 'conditional-class', {
  'class-if-true': someBoolean,
  'class-if-false': !someBoolean
});
```

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Orange/Yellow (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Indigo (#6366f1)
- **Neutral**: Gray (#6b7280)

### Typography
- **Font Family**: Inter, system-ui
- **Headings**: Bold, larger sizes
- **Body**: Regular, readable size
- **Captions**: Smaller, gray color

### Spacing
- Tailwind default spacing scale (0, 1, 2, 3, 4, 6, 8, 12, 16, etc.)

### Border Radius
- Small: 0.25rem
- Default: 0.5rem
- Large: 1rem

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Grid System
```tsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Grid items */}
</div>
```

---

## 🧪 Testing Components

### Unit Testing
```tsx
// Example with Vitest + React Testing Library
import { render, screen } from '@testing-library/react';
import { KPIWidget } from './KPIWidget';

test('renders KPI widget with metric', () => {
  render(
    <KPIWidget
      title="BOR"
      metric={{ value: 78.5, unit: '%' }}
    />
  );
  
  expect(screen.getByText('BOR')).toBeInTheDocument();
  expect(screen.getByText('78,5%')).toBeInTheDocument();
});
```

### E2E Testing
```tsx
// Example with Playwright
test('user can view capacity metrics', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  await page.click('a[href="/capacity"]');
  await expect(page.locator('h1')).toContainText('Kapasitas');
});
```

---

**Dokumen ini di-maintain oleh Frontend Team**
*Last updated: 2024-01-01*
