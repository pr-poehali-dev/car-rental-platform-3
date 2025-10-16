import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import FilterSection from '@/components/FilterSection';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { storage, initializeDefaultCars } from '@/lib/storage';

const Index = () => {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);

  useEffect(() => {
    initializeDefaultCars();
    const cars = storage.getCars();
    setFeaturedCars(cars.slice(0, 6));
  }, []);

  const defaultCars = [
    {
      id: '1',
      name: 'Mercedes-Benz C-Class',
      category: 'Седан',
      price: 89,
      location: 'Москва, Центр',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
      features: ['Автомат', 'Кожа', 'GPS'],
    },
    {
      id: '2',
      name: 'BMW X5',
      category: 'Внедорожник',
      price: 120,
      location: 'Санкт-Петербург',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/22e6d808-3bd7-4d00-9086-17a175399b88.jpg',
      features: ['Полный привод', '7 мест', 'Камера'],
    },
    {
      id: '3',
      name: 'Porsche 911 Carrera',
      category: 'Спорткар',
      price: 250,
      location: 'Москва, Рублевка',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/f34659bb-d563-44ee-9cc2-997e377579a6.jpg',
      features: ['Кабриолет', 'Спорт режим', 'Premium'],
    },
    {
      id: '4',
      name: 'Toyota Camry',
      category: 'Седан',
      price: 55,
      location: 'Казань',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
      features: ['Экономичный', 'Надежный', 'Комфорт'],
    },
    {
      id: '5',
      name: 'Range Rover Sport',
      category: 'Внедорожник',
      price: 150,
      location: 'Москва, Сити',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/22e6d808-3bd7-4d00-9086-17a175399b88.jpg',
      features: ['Люкс', 'Панорама', 'Массаж'],
    },
    {
      id: '6',
      name: 'Audi A5 Sportback',
      category: 'Седан',
      price: 95,
      location: 'Екатеринбург',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
      features: ['Quattro', 'LED', 'Круиз-контроль'],
    },
  ];

  const categories = [
    { name: 'Седан', icon: 'Car', count: 45 },
    { name: 'Внедорожник', icon: 'Truck', count: 32 },
    { name: 'Спорткар', icon: 'Zap', count: 18 },
    { name: 'Минивэн', icon: 'Users', count: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div 
        className="relative bg-gradient-to-br from-primary to-blue-700 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Арендуй автомобиль мечты
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Платформа для безопасной аренды автомобилей между частными лицами. 
              Более 100 автомобилей в вашем городе.
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary" className="hover:scale-105 transition-transform">
                <Icon name="Search" size={20} className="mr-2" />
                Найти авто
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Разместить объявление
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <FilterSection />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.name}
              className="bg-white p-6 rounded-lg border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-secondary rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name={category.icon as any} size={32} />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} авто</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Популярные предложения</h2>
          <Button variant="ghost">
            Смотреть все
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>

      <div className="bg-primary text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-lg opacity-90">Автомобилей в каталоге</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold mb-2">1200+</div>
              <p className="text-lg opacity-90">Довольных клиентов</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">Городов России</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">CarRent</h3>
              <p className="text-sm">
                Безопасная платформа для аренды автомобилей между частными лицами.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Как это работает</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Правовая информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 CarRent. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;