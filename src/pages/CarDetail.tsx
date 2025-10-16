import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CarDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const car = {
    id: '1',
    name: 'Mercedes-Benz C-Class',
    category: 'Седан',
    price: 89,
    location: 'Москва, Центр',
    images: [
      'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
      'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
      'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
    ],
    description: 'Роскошный седан премиум-класса в отличном состоянии. Идеально подходит для деловых поездок и особых случаев. Автомобиль регулярно проходит техническое обслуживание в официальном дилерском центре.',
    year: 2022,
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: 5,
    engine: '2.0',
    rating: 4.9,
    reviews: 23,
    owner: {
      name: 'Иван Петров',
      avatar: '',
      rating: 4.8,
      carsCount: 3,
      memberSince: 'Янв 2023',
    },
    features: [
      'Кожаный салон',
      'GPS навигация',
      'Bluetooth',
      'Камера заднего вида',
      'Парковочные датчики',
      'Круиз-контроль',
      'Подогрев сидений',
      'Климат-контроль',
      'Люк',
      'LED фары',
    ],
  };

  const calculateDays = () => {
    if (dateRange.from && dateRange.to) {
      const diff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const days = calculateDays();
  const totalPrice = days * car.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <Icon name="ArrowLeft" size={20} />
          Назад к каталогу
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={car.images[selectedImage]}
                  alt={car.name}
                  className="w-full h-96 object-cover"
                />
                <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Icon name="Heart" size={24} className="text-gray-600" />
                </button>
                <Badge className="absolute top-4 left-4 bg-white text-primary text-base px-4 py-2">
                  {car.category}
                </Badge>
              </div>
              
              <div className="p-4 flex gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${car.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={18} />
                      {car.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                      {car.rating} ({car.reviews} отзывов)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">${car.price}</div>
                  <div className="text-sm text-muted-foreground">за день</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  <div className="text-sm">
                    <div className="font-semibold">{car.year}</div>
                    <div className="text-muted-foreground text-xs">Год</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Icon name="Settings" size={20} className="text-primary" />
                  <div className="text-sm">
                    <div className="font-semibold">{car.transmission}</div>
                    <div className="text-muted-foreground text-xs">КПП</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Icon name="Fuel" size={20} className="text-primary" />
                  <div className="text-sm">
                    <div className="font-semibold">{car.fuel}</div>
                    <div className="text-muted-foreground text-xs">Топливо</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                  <div className="text-sm">
                    <div className="font-semibold">{car.seats} мест</div>
                    <div className="text-muted-foreground text-xs">Пассажиры</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Особенности</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={18} className="text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Владелец</h2>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={car.owner.avatar} />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {car.owner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{car.owner.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                      {car.owner.rating}
                    </span>
                    <span>{car.owner.carsCount} авто</span>
                    <span>С {car.owner.memberSince}</span>
                  </div>
                </div>
                <Button variant="outline">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Написать
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Бронирование</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Выберите даты</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Icon name="Calendar" size={18} className="mr-2" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, 'dd MMM', { locale: ru })} - {format(dateRange.to, 'dd MMM', { locale: ru })}
                            </>
                          ) : (
                            format(dateRange.from, 'dd MMM yyyy', { locale: ru })
                          )
                        ) : (
                          'Выберите период'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range: any) => setDateRange({ from: range?.from, to: range?.to })}
                        numberOfMonths={1}
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {days > 0 && (
                  <div className="bg-secondary p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>${car.price} × {days} дней</span>
                      <span>${car.price * days}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Сервисный сбор</span>
                      <span>${Math.round(totalPrice * 0.1)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Итого</span>
                      <span className="text-primary">${totalPrice + Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg" disabled={days === 0}>
                  <Icon name="Check" size={20} className="mr-2" />
                  {days === 0 ? 'Выберите даты' : 'Забронировать'}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  Оплата не требуется сейчас
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Shield" size={18} className="text-green-500" />
                  <span>Защита бронирования</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={18} className="text-blue-500" />
                  <span>Бесплатная отмена за 24ч</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="BadgeCheck" size={18} className="text-primary" />
                  <span>Проверенный владелец</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
