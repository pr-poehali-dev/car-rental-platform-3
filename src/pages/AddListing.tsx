import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';

const AddListing = () => {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    category: '',
    description: '',
    price: '',
    location: '',
    transmission: '',
    fuel: '',
    seats: '',
    engine: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages((prev) => [...prev, ...newImages]);
              toast({
                title: 'Фото загружены',
                description: `Добавлено ${files.length} фотографий`,
              });
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: 'Фото удалено',
      variant: 'destructive',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || uploadedImages.length === 0) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля и добавьте фото',
        variant: 'destructive',
      });
      return;
    }

    const newCar = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      location: formData.location || 'Москва',
      image: uploadedImages[0],
      images: uploadedImages,
      features: [formData.transmission, formData.fuel, `${formData.seats} мест`].filter(Boolean),
      description: formData.description,
      year: Number(formData.year),
      transmission: formData.transmission,
      fuel: formData.fuel,
      seats: Number(formData.seats),
      engine: formData.engine,
      rating: 5.0,
      reviews: 0,
      owner: {
        name: 'Вы',
        avatar: '',
        rating: 5.0,
        carsCount: 1,
        memberSince: 'Сегодня',
      },
    };

    storage.addCar(newCar);
    storage.addUserListing(newCar.id);

    toast({
      title: 'Успешно!',
      description: 'Объявление опубликовано',
    });

    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Разместить объявление</h1>
          <p className="text-muted-foreground">Заполните информацию о вашем автомобиле</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Car" size={24} />
              Основная информация
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Марка и модель *</label>
                <Input 
                  placeholder="Например: BMW X5" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Год выпуска *</label>
                  <Input 
                    type="number" 
                    placeholder="2022" 
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Категория *</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Седан">Седан</SelectItem>
                      <SelectItem value="Внедорожник">Внедорожник</SelectItem>
                      <SelectItem value="Спорткар">Спорткар</SelectItem>
                      <SelectItem value="Минивэн">Минивэн</SelectItem>
                      <SelectItem value="Эконом">Эконом</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Описание</label>
                <Textarea 
                  placeholder="Расскажите о вашем автомобиле, его особенностях и преимуществах"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="ImagePlus" size={24} />
              Фотографии
            </h2>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Фото ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Icon name="X" size={16} />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded">
                        Главное фото
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <label className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Нажмите или перетащите фотографии сюда
              </p>
              <p className="text-xs text-muted-foreground">
                {uploadedImages.length === 0 
                  ? 'Рекомендуется загрузить минимум 3 фотографии'
                  : `Загружено ${uploadedImages.length} фото. Можно добавить ещё`
                }
              </p>
            </label>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="DollarSign" size={24} />
              Цена и условия
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Цена за день *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      className="pl-8" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Минимальный срок аренды</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 день</SelectItem>
                      <SelectItem value="3">3 дня</SelectItem>
                      <SelectItem value="7">Неделя</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Местоположение *</label>
                <Input 
                  placeholder="Город, район" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Settings" size={24} />
              Характеристики
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2">Коробка передач</label>
                <Select value={formData.transmission} onValueChange={(value) => setFormData({...formData, transmission: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Автомат">Автомат</SelectItem>
                    <SelectItem value="Механика">Механика</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Тип топлива</label>
                <Select value={formData.fuel} onValueChange={(value) => setFormData({...formData, fuel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Бензин">Бензин</SelectItem>
                    <SelectItem value="Дизель">Дизель</SelectItem>
                    <SelectItem value="Электро">Электро</SelectItem>
                    <SelectItem value="Гибрид">Гибрид</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Количество мест</label>
                <Input 
                  type="number" 
                  placeholder="5" 
                  value={formData.seats}
                  onChange={(e) => setFormData({...formData, seats: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Объем двигателя (л)</label>
                <Input 
                  type="number" 
                  step="0.1" 
                  placeholder="2.0" 
                  value={formData.engine}
                  onChange={(e) => setFormData({...formData, engine: e.target.value})}
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" size="lg">
              <Icon name="Check" size={20} className="mr-2" />
              Опубликовать объявление
            </Button>
            <Button type="button" variant="outline" size="lg">
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;