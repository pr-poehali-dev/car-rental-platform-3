import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import FilterSection from '@/components/FilterSection';
import CarCard from '@/components/CarCard';
import { storage, initializeDefaultCars } from '@/lib/storage';

const Catalog = () => {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    initializeDefaultCars();
    setCars(storage.getCars());
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
    {
      id: '7',
      name: 'Volkswagen Polo',
      category: 'Эконом',
      price: 35,
      location: 'Новосибирск',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
      features: ['Механика', 'Малый расход', 'ABS'],
    },
    {
      id: '8',
      name: 'Lexus RX 350',
      category: 'Внедорожник',
      price: 135,
      location: 'Москва, ЦАО',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/22e6d808-3bd7-4d00-9086-17a175399b88.jpg',
      features: ['Гибрид', 'Премиум', 'Безопасность'],
    },
    {
      id: '9',
      name: 'Nissan GT-R',
      category: 'Спорткар',
      price: 280,
      location: 'Москва',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/f34659bb-d563-44ee-9cc2-997e377579a6.jpg',
      features: ['600 л.с.', 'Полный привод', 'Карбон'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Каталог автомобилей</h1>
          <p className="text-muted-foreground">Найдено {cars.length} автомобилей</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <FilterSection />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;