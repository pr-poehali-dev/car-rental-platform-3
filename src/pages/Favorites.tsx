import Navigation from '@/components/Navigation';
import CarCard from '@/components/CarCard';
import Icon from '@/components/ui/icon';

const Favorites = () => {
  const favorites = [
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
      id: '3',
      name: 'Porsche 911 Carrera',
      category: 'Спорткар',
      price: 250,
      location: 'Москва, Рублевка',
      image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/f34659bb-d563-44ee-9cc2-997e377579a6.jpg',
      features: ['Кабриолет', 'Спорт режим', 'Premium'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Icon name="Heart" size={32} className="text-primary" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Избранное</h1>
              <p className="text-muted-foreground">
                {favorites.length === 0 ? 'У вас пока нет избранных автомобилей' : `${favorites.length} автомобилей`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="HeartOff" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Здесь пока пусто</h2>
            <p className="text-muted-foreground mb-6">
              Добавляйте автомобили в избранное, чтобы быстро находить их позже
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
