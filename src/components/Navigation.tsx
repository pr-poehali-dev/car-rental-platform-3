import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/catalog', label: 'Каталог', icon: 'Car' },
    { path: '/add-listing', label: 'Разместить', icon: 'Plus' },
    { path: '/favorites', label: 'Избранное', icon: 'Heart' },
    { path: '/profile', label: 'Профиль', icon: 'User' },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
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

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold text-primary">CarRent</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    <Icon name={item.icon as any} size={22} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button className="w-full" size="lg">
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </Button>
                <Button variant="outline" className="w-full mt-3" size="lg">
                  Регистрация
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t space-y-3">
                <Link 
                  to="/help" 
                  onClick={handleNavClick}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="HelpCircle" size={18} />
                  Помощь и поддержка
                </Link>
                <Link 
                  to="/about" 
                  onClick={handleNavClick}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Info" size={18} />
                  О сервисе
                </Link>
                <Link 
                  to="/settings" 
                  onClick={handleNavClick}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Settings" size={18} />
                  Настройки
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
