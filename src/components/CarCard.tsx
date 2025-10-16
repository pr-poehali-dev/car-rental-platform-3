import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface CarCardProps {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  location: string;
  features?: string[];
}

const CarCard = ({ id, image, name, category, price, location, features = [] }: CarCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsFavorite(storage.isFavorite(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      storage.removeFromFavorites(id);
      toast({
        title: 'Удалено из избранного',
        variant: 'destructive',
      });
    } else {
      storage.addToFavorites(id);
      toast({
        title: 'Добавлено в избранное',
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Icon 
            name="Heart" 
            size={20} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
        <Badge className="absolute top-3 left-3 bg-white text-primary">
          {category}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Icon name="MapPin" size={16} />
          <span>{location}</span>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-md">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">${price}</span>
            <span className="text-sm text-muted-foreground">/день</span>
          </div>
          <Link to={`/car/${id}`}>
            <Button size="sm">
              Подробнее
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CarCard;