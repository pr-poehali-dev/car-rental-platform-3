import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const userListings = [
    {
      id: '1',
      name: 'BMW X5',
      status: 'active',
      views: 234,
      bookings: 12,
    },
    {
      id: '2',
      name: 'Mercedes-Benz E-Class',
      status: 'active',
      views: 189,
      bookings: 8,
    },
  ];

  const bookings = [
    {
      id: '1',
      car: 'Porsche 911 Carrera',
      dates: '15-18 Янв 2024',
      status: 'upcoming',
      total: 750,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-primary text-2xl font-bold">ИП</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">Иван Петров</h1>
              <p className="opacity-90">Участник с января 2024</p>
              <div className="flex gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Car" size={18} />
                  <span>2 авто</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} />
                  <span>15 аренд</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="listings">Мои объявления</TabsTrigger>
            <TabsTrigger value="bookings">Мои бронирования</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="space-y-4">
              {userListings.map((listing) => (
                <Card key={listing.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 bg-gray-200 rounded"></div>
                      <div>
                        <h3 className="font-bold text-lg">{listing.name}</h3>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" size={16} />
                            {listing.views} просмотров
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={16} />
                            {listing.bookings} аренд
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              <Button className="w-full" variant="outline">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить новое объявление
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{booking.car}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{booking.dates}</p>
                      <p className="font-semibold text-primary">${booking.total}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Детали
                      </Button>
                      <Button variant="ghost" size="sm">
                        Отменить
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Личная информация</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Имя</label>
                  <input 
                    type="text" 
                    defaultValue="Иван Петров"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="ivan@example.com"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Телефон</label>
                  <input 
                    type="tel" 
                    defaultValue="+7 (900) 123-45-67"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <Button>Сохранить изменения</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
