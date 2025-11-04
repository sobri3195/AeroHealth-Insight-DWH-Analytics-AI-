export interface TimePeriod {
  from: string;
  to: string;
}

export interface MetricValue {
  value: number;
  unit: string;
  change?: number;
  changePercent?: number;
}

export interface TimeSeriesMetric {
  data: Array<{
    date: string;
    value: number;
  }>;
  unit: string;
  aggregate?: {
    avg: number;
    min: number;
    max: number;
  };
}

export interface TATMetric {
  avgMinutes: number;
  medianMinutes: number;
  p95Minutes?: number;
  target?: number;
  compliance?: number;
}

export interface KPIOverview {
  period: TimePeriod;
  facilities: string[];
  metrics: {
    bor?: MetricValue;
    alos?: MetricValue;
    bedTurnover?: MetricValue;
    edTAT?: MetricValue;
    labTAT?: MetricValue;
  };
  lastRefresh: string;
}

export interface CapacityMetrics {
  period: TimePeriod;
  metrics: {
    bor?: TimeSeriesMetric;
    alos?: TimeSeriesMetric;
    bedTurnover?: TimeSeriesMetric;
    admissions?: TimeSeriesMetric;
    discharges?: TimeSeriesMetric;
  };
}

export interface SLABreach {
  metric: string;
  timestamp: string;
  actualValue?: number;
  targetValue?: number;
  severity: 'WARNING' | 'CRITICAL';
  rootCause?: string;
}

export interface EDMetrics {
  period: TimePeriod;
  metrics: {
    doorToDoctor?: TATMetric;
    doorToDisposition?: TATMetric;
    lwbs?: MetricValue;
  };
  slaBreaches?: SLABreach[];
}

export interface AncillaryMetrics {
  serviceType: string;
  period: TimePeriod;
  metrics: {
    avgTAT?: TATMetric;
    medianTAT?: TATMetric;
    p95TAT?: TATMetric;
    volume?: MetricValue;
  };
  tatByShift?: Array<{
    shift: string;
    avgMinutes: number;
  }>;
  slaCompliance?: number;
}

export interface QualityMetrics {
  period: TimePeriod;
  metrics: {
    clinicalPathwayCompliance?: MetricValue;
    readmission7Day?: MetricValue;
    readmission30Day?: MetricValue;
    mortalityRiskAdjusted?: MetricValue;
  };
  incidentSummary?: {
    total: number;
    bySeverity: Record<string, number>;
  };
}

export interface ClaimsSummary {
  period: string;
  totalClaims: number;
  approvedClaims: number;
  deniedClaims: number;
  approvedAmount?: number;
  deniedAmount?: number;
  denialReasons: Array<{
    reason: string;
    count: number;
    amount?: number;
  }>;
  denialRate?: number;
}

export interface RevenueMetrics {
  period: TimePeriod;
  metrics: {
    totalRevenue?: MetricValue;
    cashRevenue?: number;
    accrualRevenue?: number;
    margin?: MetricValue;
  };
  payerMix?: Array<{
    payer: string;
    percentage: number;
    amount: number;
  }>;
}

export interface SyndromicData {
  syndrome: string;
  period: TimePeriod;
  timeSeries: Array<{
    date: string;
    count: number;
    zscore: number;
  }>;
  threshold: {
    warning: number;
    critical: number;
  };
  anomalies: Array<{
    date: string;
    severity: 'WARNING' | 'CRITICAL';
  }>;
}

export interface Alert {
  id: string;
  type: 'EPI' | 'SLA' | 'CAPACITY' | 'QUALITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  facilityId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface AlertList {
  alerts: Alert[];
  total: number;
}

export interface PersonnelRiskSummary {
  period: TimePeriod;
  unitId: string;
  riskScore: number;
  metrics: {
    avgBMI?: number;
    avgBloodPressure?: {
      systolic: number;
      diastolic: number;
    };
    complianceRate?: number;
  };
  trend?: 'IMPROVING' | 'STABLE' | 'DECLINING';
}

export interface ExploreQuery {
  dimensions: string[];
  measures: string[];
  filters?: Record<string, unknown>;
  timePeriod?: TimePeriod;
  limit?: number;
}

export interface ExploreResult {
  data: Record<string, unknown>[];
  queryTime: number;
  rowCount: number;
  metadata?: {
    dimensions: string[];
    measures: string[];
  };
}

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  query: ExploreQuery;
  shared?: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SaveViewRequest {
  name: string;
  description?: string;
  query: ExploreQuery;
  shared?: boolean;
}

export interface MetricDefinition {
  id: string;
  name: string;
  description?: string;
  category: string;
  formula: string;
  unit: string;
  sourceTables?: string[];
  owner?: string;
  lastUpdated?: string;
}

export interface MetricLineage {
  metricId: string;
  sources: Array<{
    table: string;
    schema: string;
    lastRefresh?: string;
  }>;
  transformations: Array<{
    step: string;
    description?: string;
  }>;
  dataQuality?: {
    completeness: number;
    consistency: number;
    duplicateRatio: number;
  };
}

export interface CensusForecast {
  facilityId: string;
  forecast: Array<{
    date: string;
    predicted: number;
    lower: number;
    upper: number;
  }>;
  model: {
    name: string;
    version: string;
    trainedAt: string;
    metrics: {
      mae: number;
      rmse: number;
      mape: number;
    };
  };
}

export interface WhatIfScenario {
  facilityId: string;
  resourceChanges: {
    beds?: number;
    nurses?: number;
    doctors?: number;
  };
  timeHorizon?: number;
}

export interface WhatIfResult {
  scenario: WhatIfScenario;
  predictions: {
    expectedBOR?: number;
    expectedTAT?: number;
    capacityUtilization?: number;
  };
  confidence?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ApiError {
  error: string;
  details?: string[];
}
