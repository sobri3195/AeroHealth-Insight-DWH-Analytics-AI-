# Changelog

All notable changes to AeroHealth Insight will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Advanced ML forecasting with confidence intervals
- Real-time dashboard updates via WebSocket
- Advanced data export with custom filters
- Interactive geographic mapping for epidemiology
- Custom dashboard builder for power users
- Mobile responsive optimizations
- Dark theme implementation
- Multi-language support (English, Indonesian)

---

## [1.0.0] - 2024-01-01

### Added - Initial Release

#### Core Infrastructure
- React 18 + TypeScript application setup
- Vite build tool configuration
- Tailwind CSS styling system
- React Router v6 for navigation
- Zustand for state management
- TanStack Query for data fetching
- Axios HTTP client

#### Authentication & Authorization
- Login page with SSO placeholder
- Mock authentication for development
- RBAC (Role-Based Access Control) implementation
- 7 user roles with specific permissions
- Protected routes with permission checking
- JWT token management

#### Dashboard Modules

**Home Page**
- KPI overview widget with 4 key metrics
- BOR (Bed Occupancy Rate)
- ALOS (Average Length of Stay)
- Bed Turnover
- ED TAT (Emergency Department Turn-Around Time)
- Trend indicators (up/down/stable)
- Last refresh timestamp

**Capacity Management**
- Capacity metrics charts (BOR, ALOS trends)
- 14-day census forecast integration
- ML model performance metrics display
- Facility selector
- What-if scenario simulator (API ready)

**Operations**
- ED metrics placeholder
- Ancillary services TAT placeholder
- SLA breach monitoring placeholder
- Bottleneck analysis placeholder

**Quality & Safety**
- Quality metrics placeholder
- Clinical pathway compliance
- Readmission rates
- Mortality metrics

**Finance & Claims**
- Revenue metrics placeholder
- Payer mix analysis
- BPJS claims summary
- Denial reasons breakdown

**Epidemiology**
- Syndromic surveillance placeholder
- Early warning system
- Environmental monitoring (heat index)
- Geographic mapping placeholder

**Personnel Risk**
- Personnel health risk metrics (aggregate)
- Unit-level risk scores
- Trend indicators
- Compliance tracking

**Self-Service Analytics**
- Explore page placeholder
- Query builder concept
- Saved views concept
- RLS enforcement ready

**Data Catalog**
- Metric definitions display
- Example KPI formulas (BOR, ALOS)
- Data lineage concept
- Data quality scores display

**Administration**
- Admin page placeholder
- Access management concept
- Alert threshold configuration
- Data retention policies
- Audit log viewer concept

#### UI Components

**Layout Components**
- DashboardLayout with sidebar and header
- Sidebar with role-based navigation
- Header with user info and logout
- Responsive layout structure

**Dashboard Components**
- KPIWidget with trend indicators
- TrendChart with Recharts integration
- AlertCenter with severity indicators
- Color-coded alert display

**UI Primitives**
- Card component with optional header
- Button component with variants (primary, secondary, danger, ghost)
- LoadingSpinner with multiple sizes

#### API Integration
- Complete OpenAPI 3.0 specification
- 11 API endpoint categories
- Comprehensive type definitions
- Error handling and interceptors
- Token-based authentication
- Row-level security support

#### Services Layer
- API service with interceptors
- KPI service
- Capacity service (metrics & forecasts)
- Operations service (ED & ancillary)
- Service abstraction pattern

#### State Management
- Auth store (user, token, login/logout)
- UI store (theme, sidebar, facility selector)
- Persistent token storage

#### Custom Hooks
- useKPIOverview
- useCapacityMetrics
- useCensusForecast
- useWhatIfScenario
- usePermissions

#### Utilities
- Date formatting (date-fns)
- Number formatting (Intl API)
- Currency formatting (IDR)
- Percentage formatting
- Metric value smart formatting
- ClassNames utility (clsx)

#### Configuration
- Constants (API URLs, routes, thresholds)
- Permissions matrix (7 roles)
- Route access control
- SLA thresholds
- Chart colors
- Date formats

#### Documentation
- Comprehensive README with quick start
- API contract (OpenAPI YAML)
- KPI definitions with formulas
- Security design document
- Deployment guide
- Component documentation
- Wireframes for 6 main pages
- Contributing guidelines
- Code of conduct

#### Testing
- Vitest configuration
- Testing Library setup
- Sample unit test (Card component)
- E2E testing setup (Playwright)

#### Development Tools
- ESLint configuration
- Prettier configuration
- TypeScript strict mode
- Git ignore patterns
- Environment variable template
- Postman collection for API testing

#### Security
- Content Security Policy headers
- HTTPS enforcement configuration
- Token refresh mechanism
- Audit logging structure
- Data anonymization guidelines
- Row-level security support

#### Performance
- Code splitting configuration
- Lazy loading support
- React Query caching (5 min)
- Asset optimization in build
- Target LCP < 2.5s

### Security Considerations
- No PII displayed in UI
- Aggregate data only for personnel metrics
- RBAC enforced on all routes
- API authentication required
- Audit log structure defined

### Known Limitations
- Mock authentication (SSO pending)
- Some pages are placeholders
- ML services not fully integrated
- Real-time updates not implemented
- Mobile optimization pending
- Dark theme not implemented

---

## Version History

- **1.0.0** - Initial release with core features
- **0.1.0** - Internal alpha version

---

## Release Notes Guidelines

### Types of Changes
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security fixes

### Semantic Versioning
- **MAJOR** (x.0.0) - Incompatible API changes
- **MINOR** (0.x.0) - New features, backward compatible
- **PATCH** (0.0.x) - Bug fixes, backward compatible

---

For detailed commit history, see the [Git log](https://github.com/aerohealth/insight/commits).

**Maintained by AeroHealth Development Team**
