import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const FilterSection = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск автомобиля..." 
              className="pl-10"
            />
          </div>
        </div>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedan">Седан</SelectItem>
            <SelectItem value="suv">Внедорожник</SelectItem>
            <SelectItem value="sports">Спорткар</SelectItem>
            <SelectItem value="minivan">Минивэн</SelectItem>
            <SelectItem value="economy">Эконом</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Период аренды" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1day">1 день</SelectItem>
            <SelectItem value="3days">3 дня</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full">
          <Icon name="Filter" size={18} className="mr-2" />
          Найти
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t">
        <label className="text-sm font-medium mb-4 block">
          Цена: ${priceRange[0]} - ${priceRange[1]} / день
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FilterSection;
