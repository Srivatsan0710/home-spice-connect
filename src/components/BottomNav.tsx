
import { Home, Compass, ShoppingBag, User, BarChart3, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/discover', icon: Compass, label: 'Discover' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  return (
    <nav className="sticky bottom-0 z-10 grid h-16 grid-cols-5 items-center border-t bg-background">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
