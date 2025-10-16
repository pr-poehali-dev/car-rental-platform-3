import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/catalog', label: 'Каталог', icon: 'Car' },
    { path: '/add-listing', label: 'Разместить', icon: 'Plus' },
    { path: '/favorites', label: 'Избранное', icon: 'Heart' },
    { path: '/profile', label: 'Профиль', icon: 'User' },
  ];

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            CarRent
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </Link>
            ))}
          </div>

          <Button size="sm" className="hidden md:block">
            Войти
          </Button>

          <Button size="icon" variant="ghost" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
