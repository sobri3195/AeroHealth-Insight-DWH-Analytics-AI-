import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';
import { CapacityPage } from '@/pages/CapacityPage';
import { OpsPage } from '@/pages/OpsPage';
import { QualityPage } from '@/pages/QualityPage';
import { FinancePage } from '@/pages/FinancePage';
import { EpiPage } from '@/pages/EpiPage';
import { PersonnelRiskPage } from '@/pages/PersonnelRiskPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { AdminPage } from '@/pages/AdminPage';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/config/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CAPACITY}
            element={
              <ProtectedRoute>
                <CapacityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.OPS}
            element={
              <ProtectedRoute>
                <OpsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.QUALITY}
            element={
              <ProtectedRoute>
                <QualityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.FINANCE}
            element={
              <ProtectedRoute>
                <FinancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EPI}
            element={
              <ProtectedRoute>
                <EpiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PERSONNEL_RISK}
            element={
              <ProtectedRoute>
                <PersonnelRiskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EXPLORE}
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CATALOG}
            element={
              <ProtectedRoute>
                <CatalogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN}
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
