import { UserRole } from '@/types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  LEADERSHIP: [
    'view:home',
    'view:capacity',
    'view:ops',
    'view:quality',
    'view:finance',
    'view:epi',
    'view:personnel-risk',
    'view:all-facilities',
  ],
  UNIT_HEAD: [
    'view:home',
    'view:capacity',
    'view:ops',
    'view:quality',
    'view:unit-facility',
  ],
  ANALYST_QUALITY: [
    'view:home',
    'view:quality',
    'view:ops',
    'view:explore',
    'view:catalog',
    'export:non-pii',
  ],
  ANALYST_FINANCE: [
    'view:home',
    'view:finance',
    'view:explore',
    'view:catalog',
    'export:non-pii',
  ],
  EPIDEMIOLOGIST: [
    'view:home',
    'view:epi',
    'view:quality',
    'view:explore',
    'view:catalog',
    'export:epi-data',
  ],
  AUDITOR: [
    'view:catalog',
    'view:lineage',
    'view:audit-logs',
    'view:data-quality',
    'view:all-facilities',
  ],
  DATA_STEWARD: [
    'view:catalog',
    'view:lineage',
    'view:data-quality',
    'view:admin',
    'manage:access-policies',
    'manage:thresholds',
  ],
};

export function hasPermission(userRole: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const routePermissionMap: Record<string, string> = {
    '/': 'view:home',
    '/capacity': 'view:capacity',
    '/ops': 'view:ops',
    '/quality': 'view:quality',
    '/finance': 'view:finance',
    '/epi': 'view:epi',
    '/personnel-risk': 'view:personnel-risk',
    '/explore': 'view:explore',
    '/catalog': 'view:catalog',
    '/admin': 'view:admin',
  };

  const requiredPermission = routePermissionMap[route];
  return requiredPermission ? hasPermission(userRole, requiredPermission) : false;
}
