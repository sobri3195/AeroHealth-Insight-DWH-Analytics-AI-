import { NavLink } from 'react-router-dom';
import {
  Home,
  Bed,
  Activity,
  Award,
  DollarSign,
  BarChart3,
  Users,
  Search,
  BookOpen,
  Settings,
} from 'lucide-react';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/config/constants';
import { cn } from '@/utils/cn';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  permission?: string;
}

const navItems: NavItem[] = [
  { to: ROUTES.HOME, icon: <Home className="h-5 w-5" />, label: 'Beranda' },
  { to: ROUTES.CAPACITY, icon: <Bed className="h-5 w-5" />, label: 'Kapasitas', permission: 'view:capacity' },
  { to: ROUTES.OPS, icon: <Activity className="h-5 w-5" />, label: 'Operasional', permission: 'view:ops' },
  { to: ROUTES.QUALITY, icon: <Award className="h-5 w-5" />, label: 'Mutu', permission: 'view:quality' },
  { to: ROUTES.FINANCE, icon: <DollarSign className="h-5 w-5" />, label: 'Keuangan', permission: 'view:finance' },
  { to: ROUTES.EPI, icon: <BarChart3 className="h-5 w-5" />, label: 'Epidemiologi', permission: 'view:epi' },
  { to: ROUTES.PERSONNEL_RISK, icon: <Users className="h-5 w-5" />, label: 'Risiko Personel', permission: 'view:personnel-risk' },
  { to: ROUTES.EXPLORE, icon: <Search className="h-5 w-5" />, label: 'Eksplorasi', permission: 'view:explore' },
  { to: ROUTES.CATALOG, icon: <BookOpen className="h-5 w-5" />, label: 'Katalog', permission: 'view:catalog' },
  { to: ROUTES.ADMIN, icon: <Settings className="h-5 w-5" />, label: 'Admin', permission: 'view:admin' },
];

export function Sidebar() {
  const { checkPermission } = usePermissions();

  const visibleItems = navItems.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">AeroHealth</h1>
        <p className="text-sm text-gray-400 mt-1">Insight Platform</p>
      </div>
      <nav className="mt-6">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-6 py-3 text-sm transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
