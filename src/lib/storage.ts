export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  location: string;
  image: string;
  images: string[];
  features: string[];
  description: string;
  year: number;
  transmission: string;
  fuel: string;
  seats: number;
  engine: string;
  rating: number;
  reviews: number;
  owner: {
    name: string;
    avatar: string;
    rating: number;
    carsCount: number;
    memberSince: string;
  };
}

const STORAGE_KEYS = {
  CARS: 'carrent_cars',
  FAVORITES: 'carrent_favorites',
  USER_LISTINGS: 'carrent_user_listings',
};

export const storage = {
  getCars: (): Car[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CARS);
    return data ? JSON.parse(data) : [];
  },

  saveCars: (cars: Car[]) => {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
  },

  addCar: (car: Car) => {
    const cars = storage.getCars();
    cars.push(car);
    storage.saveCars(cars);
  },

  updateCar: (id: string, updates: Partial<Car>) => {
    const cars = storage.getCars();
    const index = cars.findIndex(c => c.id === id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...updates };
      storage.saveCars(cars);
    }
  },

  deleteCar: (id: string) => {
    const cars = storage.getCars().filter(c => c.id !== id);
    storage.saveCars(cars);
  },

  getCarById: (id: string): Car | undefined => {
    return storage.getCars().find(c => c.id === id);
  },

  getFavorites: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  },

  addToFavorites: (carId: string) => {
    const favorites = storage.getFavorites();
    if (!favorites.includes(carId)) {
      favorites.push(carId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  },

  removeFromFavorites: (carId: string) => {
    const favorites = storage.getFavorites().filter(id => id !== carId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  },

  isFavorite: (carId: string): boolean => {
    return storage.getFavorites().includes(carId);
  },

  getUserListings: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_LISTINGS);
    return data ? JSON.parse(data) : [];
  },

  addUserListing: (carId: string) => {
    const listings = storage.getUserListings();
    if (!listings.includes(carId)) {
      listings.push(carId);
      localStorage.setItem(STORAGE_KEYS.USER_LISTINGS, JSON.stringify(listings));
    }
  },
};

export const initializeDefaultCars = () => {
  const existingCars = storage.getCars();
  if (existingCars.length === 0) {
    const defaultCars: Car[] = [
      {
        id: '1',
        name: 'Mercedes-Benz C-Class',
        category: 'Седан',
        price: 89,
        location: 'Москва, Центр',
        image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
        images: [
          'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
          'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
          'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/46aab7ad-6b64-4ee3-a7b3-011c2bc92e34.jpg',
        ],
        features: ['Автомат', 'Кожа', 'GPS'],
        description: 'Роскошный седан премиум-класса в отличном состоянии.',
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
      },
      {
        id: '2',
        name: 'BMW X5',
        category: 'Внедорожник',
        price: 120,
        location: 'Санкт-Петербург',
        image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/22e6d808-3bd7-4d00-9086-17a175399b88.jpg',
        images: [
          'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/22e6d808-3bd7-4d00-9086-17a175399b88.jpg',
        ],
        features: ['Полный привод', '7 мест', 'Камера'],
        description: 'Мощный внедорожник для всей семьи.',
        year: 2021,
        transmission: 'Автомат',
        fuel: 'Дизель',
        seats: 7,
        engine: '3.0',
        rating: 4.7,
        reviews: 15,
        owner: {
          name: 'Мария Иванова',
          avatar: '',
          rating: 4.9,
          carsCount: 2,
          memberSince: 'Фев 2023',
        },
      },
      {
        id: '3',
        name: 'Porsche 911 Carrera',
        category: 'Спорткар',
        price: 250,
        location: 'Москва, Рублевка',
        image: 'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/f34659bb-d563-44ee-9cc2-997e377579a6.jpg',
        images: [
          'https://cdn.poehali.dev/projects/7b0bbc9c-7232-4bdf-aef8-711cf309e01f/files/f34659bb-d563-44ee-9cc2-997e377579a6.jpg',
        ],
        features: ['Кабриолет', 'Спорт режим', 'Premium'],
        description: 'Легендарный спорткар для особых моментов.',
        year: 2023,
        transmission: 'Автомат',
        fuel: 'Бензин',
        seats: 2,
        engine: '3.0',
        rating: 5.0,
        reviews: 8,
        owner: {
          name: 'Алексей Смирнов',
          avatar: '',
          rating: 5.0,
          carsCount: 1,
          memberSince: 'Мар 2023',
        },
      },
    ];
    storage.saveCars(defaultCars);
  }
};
