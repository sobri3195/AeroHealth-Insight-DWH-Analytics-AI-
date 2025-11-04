# Security Design - AeroHealth Insight

## 🔒 Prinsip Keamanan

### Zero Trust Architecture
- Tidak ada trust implisit
- Verifikasi setiap request
- Least privilege access
- Defense in depth

### Privacy by Design
- Data minimization
- Purpose limitation
- Anonymization/aggregation di UI
- Consent boundaries

---

## 🔐 Authentication & Authorization

### Authentication

#### SSO (Single Sign-On)
- **Provider**: OAuth 2.0 / SAML 2.0
- **Flow**: Authorization Code with PKCE
- **Identity Provider**: Keycloak / Azure AD / Okta
- **Features**:
  - Just-in-time user provisioning
  - Attribute-based mapping (role, facilities)

#### MFA (Multi-Factor Authentication)
- **Methods**:
  - TOTP (Time-based One-Time Password)
  - SMS OTP (fallback)
  - Hardware token (high-security users)
- **Enforcement**: Required for roles: LEADERSHIP, AUDITOR, DATA_STEWARD

#### Session Management
- **Token Type**: JWT (JSON Web Token)
- **Token Lifetime**:
  - Access Token: 15 minutes
  - Refresh Token: 7 days
- **Token Binding**: Bound to device fingerprint
- **Refresh Token Rotation**: New refresh token issued on each use
- **Token Storage**:
  - Access Token: Memory (React state)
  - Refresh Token: HttpOnly, Secure, SameSite cookie

### Authorization

#### RBAC (Role-Based Access Control)

**Roles & Permissions:**

| Role | Permissions |
|------|-------------|
| **LEADERSHIP** | view:home, view:capacity, view:ops, view:quality, view:finance, view:epi, view:personnel-risk, view:all-facilities |
| **UNIT_HEAD** | view:home, view:capacity, view:ops, view:quality, view:unit-facility |
| **ANALYST_QUALITY** | view:home, view:quality, view:ops, view:explore, view:catalog, export:non-pii |
| **ANALYST_FINANCE** | view:home, view:finance, view:explore, view:catalog, export:non-pii |
| **EPIDEMIOLOGIST** | view:home, view:epi, view:quality, view:explore, view:catalog, export:epi-data |
| **AUDITOR** | view:catalog, view:lineage, view:audit-logs, view:data-quality, view:all-facilities |
| **DATA_STEWARD** | view:catalog, view:lineage, view:data-quality, view:admin, manage:access-policies, manage:thresholds |

#### ABAC (Attribute-Based Access Control)

**Attributes:**
- **User Attributes**: role, facilities[], unit, rank
- **Resource Attributes**: facilityId, unitId, dataClassification
- **Environment Attributes**: time, location, device

**Policy Example:**
```json
{
  "effect": "allow",
  "subject": {
    "role": "UNIT_HEAD",
    "facilities": ["RS_A", "RS_B"]
  },
  "action": "view",
  "resource": {
    "type": "capacity_metrics",
    "facilityId": {"$in": ["RS_A", "RS_B"]}
  }
}
```

#### RLS (Row-Level Security)

Implemented at API layer:
- Automatic filtering based on user's facility access
- Query predicates injected: `WHERE facility_id IN (user.facilities)`
- Transparent to frontend
- Cannot be bypassed

---

## 🛡️ Data Protection

### Data Classification

| Level | Description | Examples | Access Control |
|-------|-------------|----------|----------------|
| **Level 4: PII** | Patient identifiable | Name, MRN, NIK | Never exposed to UI |
| **Level 3: Sensitive** | Clinical details | Diagnosis, procedures | Aggregated only |
| **Level 2: Internal** | Operational metrics | TAT, BOR, ALOS | Role-based |
| **Level 1: Public** | General stats | Overall capacity | All authenticated |

### Data Anonymization

**Techniques:**
1. **Aggregation**: Minimum group size = 5
2. **Suppression**: Remove direct identifiers
3. **Generalization**: Age ranges instead of exact age
4. **Noise Addition**: For statistical queries

**UI Rules:**
- No patient names
- No medical record numbers
- No birth dates
- Only aggregated counts and metrics

### Encryption

#### In Transit
- **TLS 1.3** mandatory
- **HSTS** (HTTP Strict Transport Security)
- **Certificate Pinning** for mobile apps

#### At Rest
- Database: AES-256 encryption
- File storage: AES-256 encryption
- Backups: Encrypted with separate keys

---

## 🚨 Security Headers

### Content Security Policy (CSP)
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
connect-src 'self' https://api.aerohealth.mil;
font-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

### Other Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 📊 Audit & Logging

### Audit Events

**Tracked Actions:**
- User login/logout
- Page access
- Metric viewed
- Data export
- Query execution
- View saved/shared
- Configuration changes
- Access denied attempts

**Audit Log Format:**
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "eventId": "uuid",
  "userId": "user123",
  "username": "dr.smith",
  "role": "ANALYST_QUALITY",
  "action": "VIEW_METRIC",
  "resource": "/api/quality/metrics",
  "facilityId": "RS_A",
  "ipAddress": "10.0.0.1",
  "userAgent": "Mozilla/5.0...",
  "result": "SUCCESS",
  "metadata": {
    "metricType": "readmission_rate",
    "dateRange": "2024-01-01:2024-01-31"
  }
}
```

### Tamper-Evident Logging
- Logs written to immutable storage (WORM)
- Cryptographic hash chain
- Periodic merkle tree root published
- Cannot be modified or deleted

### Log Retention
- **Audit logs**: 7 years
- **Access logs**: 2 years
- **Error logs**: 1 year

---

## 🔍 Data Governance

### Data Lineage

**Tracked Information:**
- Source systems (SIMRS, BPJS, LIS, HR, IoT)
- Transformation steps (ETL/ELT)
- Data quality checks
- Last refresh timestamp
- Data owner
- Business glossary link

**Lineage Example:**
```
[SIMRS.admissions] 
  → [staging.raw_admissions]
  → [dwh.fact_admissions]
  → [metrics.bor_daily]
  → [API: /api/capacity/metrics]
  → [UI: Capacity Dashboard]
```

### Data Quality Metrics

**Monitored Dimensions:**
- **Completeness**: % non-null values
- **Consistency**: Cross-table validation
- **Timeliness**: Data freshness
- **Accuracy**: Business rule validation
- **Duplicate Ratio**: Record duplication

**Quality Score:**
```
Quality Score = (Completeness × 0.3) + 
                (Consistency × 0.3) + 
                (Timeliness × 0.2) + 
                (Accuracy × 0.2)
```

**Thresholds:**
- Critical: < 85%
- Warning: 85-95%
- Good: > 95%

---

## 🚦 Rate Limiting & Throttling

### API Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| KPI/Metrics | 100 req | 1 minute |
| Explore Query | 20 req | 1 minute |
| ML Forecast | 10 req | 5 minutes |
| Export | 5 req | 1 hour |

### Response on Limit Exceeded
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "retryAfter": 60
}
```
HTTP Status: `429 Too Many Requests`

---

## 🧪 Security Testing

### Automated Security Scans
- **SAST** (Static Application Security Testing): SonarQube
- **DAST** (Dynamic Application Security Testing): OWASP ZAP
- **Dependency Scanning**: npm audit, Snyk
- **Container Scanning**: Trivy

### Penetration Testing
- **Frequency**: Quarterly
- **Scope**: Full application stack
- **Standards**: OWASP Top 10, SANS 25

### Security Code Review
- All PRs reviewed for security implications
- Sensitive code (auth, crypto) requires security team approval

---

## 🔐 Secrets Management

### Environment Variables
- Never commit to Git
- Stored in secure vault (HashiCorp Vault, AWS Secrets Manager)
- Rotated regularly

### API Keys
- Unique per environment (dev, staging, prod)
- Rotated every 90 days
- Audited on access

### Encryption Keys
- HSM (Hardware Security Module) for production
- Key rotation: Annual
- Separate keys for different data classifications

---

## 📋 Compliance

### Standards & Regulations
- **GDPR**: EU data protection
- **HIPAA**: Health data privacy (US equivalent)
- **UU ITE**: Indonesia electronic information law
- **ISO 27001**: Information security management
- **KARS**: Hospital accreditation standards

### Data Subject Rights
- Right to access
- Right to rectification
- Right to erasure
- Right to data portability
- Right to object

### Consent Management
- Explicit consent for data processing
- Granular consent (per purpose)
- Consent withdrawal mechanism
- Consent audit trail

---

## 🚨 Incident Response

### Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| **P0** | Data breach, system down | Immediate (< 15 min) |
| **P1** | Unauthorized access attempt | < 1 hour |
| **P2** | Security misconfiguration | < 4 hours |
| **P3** | Minor vulnerability | < 24 hours |

### Response Procedure
1. **Detection**: Automated alerts + manual reporting
2. **Containment**: Isolate affected systems
3. **Investigation**: Forensic analysis
4. **Remediation**: Patch vulnerabilities
5. **Recovery**: Restore normal operations
6. **Post-Mortem**: Root cause analysis, prevention

### Notification
- **Internal**: Security team, management
- **External**: Data protection authority (if breach > threshold)
- **Users**: Affected users notified within 72 hours

---

## ✅ Security Checklist (Pre-Deployment)

- [ ] All secrets moved to vault
- [ ] CSP headers configured
- [ ] HTTPS enforced (HSTS)
- [ ] Rate limiting enabled
- [ ] Audit logging active
- [ ] MFA enabled for privileged users
- [ ] Dependency vulnerabilities scanned
- [ ] Penetration test completed
- [ ] Security code review passed
- [ ] Data classification tagged
- [ ] RLS policies tested
- [ ] Backup encryption verified
- [ ] Incident response plan documented
- [ ] Compliance requirements validated

---

**Dokumen ini di-maintain oleh Security & Compliance Team**
*Last updated: 2024-01-01*
