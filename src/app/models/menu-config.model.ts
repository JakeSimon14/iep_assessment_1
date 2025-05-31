export interface OtrMenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export const ConstOtrDashboardMenu: OtrMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'k-icon k-i-home', route: '/dashboard' },
  { id: 'profile', label: 'Profile', icon: 'k-icon k-i-user', route: '/profile' },
  { id: 'settings', label: 'Settings', icon: 'k-icon k-i-gear', route: '/settings' }
];