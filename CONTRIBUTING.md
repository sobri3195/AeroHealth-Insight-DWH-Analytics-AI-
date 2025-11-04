# Contributing to AeroHealth Insight

Thank you for your interest in contributing to AeroHealth Insight! This document provides guidelines for contributing to this project.

## 🤝 Code of Conduct

- Be respectful and professional
- Collaborate constructively
- Follow security and privacy guidelines
- Maintain confidentiality of sensitive data

## 🔒 Security First

Before contributing, ensure you understand:
- Data classification levels
- Privacy requirements (no PII in UI)
- Row-level security (RLS) constraints
- Audit logging requirements

## 🛠️ Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aerohealth-insight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with appropriate values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Pull Request Process

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch Naming Convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test additions/updates

### 2. Make Your Changes

Follow these guidelines:

#### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write self-documenting code
- Add comments only for complex logic

#### Component Guidelines
```tsx
// ✅ Good: Functional component with TypeScript
interface MyComponentProps {
  title: string;
  onSave: (data: Data) => void;
}

export function MyComponent({ title, onSave }: MyComponentProps) {
  // Implementation
}

// ❌ Bad: Default export, no types
export default function MyComponent(props) {
  // Implementation
}
```

#### Naming Conventions
- Components: PascalCase (`KPIWidget.tsx`)
- Hooks: camelCase with 'use' prefix (`useKPIOverview.ts`)
- Services: camelCase with '.service' suffix (`kpi.service.ts`)
- Utils: camelCase (`format.ts`)
- Constants: SCREAMING_SNAKE_CASE (`API_BASE_URL`)

#### File Organization
```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API service layer
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### 3. Write Tests

All new features should include tests:

```tsx
// Component test example
import { render, screen } from '@testing-library/react';
import { KPIWidget } from './KPIWidget';

test('renders KPI widget with value', () => {
  render(
    <KPIWidget
      title="BOR"
      metric={{ value: 78.5, unit: '%' }}
    />
  );
  
  expect(screen.getByText('BOR')).toBeInTheDocument();
});
```

Run tests:
```bash
npm run test
```

### 4. Check Code Quality

Before committing, ensure:

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format

# Tests
npm run test
```

### 5. Commit Your Changes

Use conventional commit messages:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Build/tooling changes

**Examples:**
```bash
git commit -m "feat(capacity): add what-if scenario simulator"
git commit -m "fix(auth): resolve token refresh issue"
git commit -m "docs(api): update KPI endpoint documentation"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on the repository with:
- **Title**: Clear, concise description
- **Description**: 
  - What changes were made
  - Why they were made
  - How to test
  - Screenshots (if UI changes)
- **Linked Issues**: Reference related issues

### 7. Code Review

Your PR will be reviewed for:
- Code quality and style
- Test coverage
- Security implications
- Performance impact
- Documentation updates

**Be prepared to:**
- Respond to feedback
- Make requested changes
- Explain design decisions

## 🔍 Security Review

Changes touching these areas require security team review:
- Authentication/authorization
- Data access/queries
- API endpoints
- Encryption/cryptography
- User permissions

## 📋 Checklist Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Type check passing
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] No sensitive data in code
- [ ] Environment variables used for config
- [ ] Security implications considered

## 🐛 Reporting Bugs

When reporting bugs, include:
1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: 
   - Browser/version
   - Node version
   - OS
7. **Additional Context**: Logs, error messages

## 💡 Suggesting Features

Feature requests should include:
1. **Use Case**: Why is this needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **User Impact**: Who benefits?
5. **Security/Privacy**: Any implications?

## 📚 Documentation

When updating documentation:
- Keep it clear and concise
- Include code examples
- Update relevant files:
  - `README.md` - General overview
  - `docs/COMPONENTS.md` - Component documentation
  - `docs/KPI_DEFINITIONS.md` - KPI definitions
  - `docs/SECURITY_DESIGN.md` - Security documentation
  - `docs/DEPLOYMENT_GUIDE.md` - Deployment procedures

## 🎯 Performance Guidelines

- Target LCP < 2.5s
- Lazy load heavy components
- Use React.memo() for expensive components
- Implement pagination for large datasets
- Optimize images and assets
- Use code splitting

## ♿ Accessibility

Ensure your changes are accessible:
- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast

## 🌍 Internationalization

While currently in Indonesian:
- Use date-fns for date formatting
- Use Intl API for number/currency formatting
- Keep text separate from logic
- Prepare for i18n in future

## 📞 Getting Help

If you need assistance:
- Check existing documentation
- Search closed issues
- Ask in team communication channels
- Contact AeroHealth API Team (api@aerohealth.mil)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same Proprietary License as the project.

---

Thank you for contributing to AeroHealth Insight! Your contributions help improve healthcare analytics for better decision-making. 🏥📊
