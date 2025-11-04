import { useAuthStore } from '@/store/authStore';
import { hasPermission, canAccessRoute } from '@/config/permissions';

export function usePermissions() {
  const user = useAuthStore((state) => state.user);

  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const checkRouteAccess = (route: string): boolean => {
    if (!user) return false;
    return canAccessRoute(user.role, route);
  };

  return {
    checkPermission,
    checkRouteAccess,
    userRole: user?.role,
  };
}
