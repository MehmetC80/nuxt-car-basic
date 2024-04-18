import cars from "@/data/cars.json";

// interface Car {
//   id: number;
//   year?: number;
//   name: string;
//   price: number;
//   city?: string | undefined;
//   make?: string;
//   url: string;
//   seats: number;
//   miles: string;
//   features: string[];
//   description: string;
// }

export default defineEventHandler((event) => {
  const { city } = event.context.params;

  const { make, minPrice, maxPrice } = getQuery(event);

  let filteredCars = cars;

  filteredCars = filteredCars.filter((car) => {
    return car.city?.toLowerCase() === city.toLowerCase();
  });

  if (make) {
    filteredCars = filteredCars.filter((car) => {
      return car.make?.toLowerCase() === make.toLowerCase();
    });

    if (minPrice) {
      filteredCars = filteredCars.filter((car) => {
        return car.price >= parseInt(minPrice);
      });
    }

    if (maxPrice) {
      filteredCars = filteredCars.filter((car) => {
        return car.price <= parseInt(maxPrice);
      });
    }
  }

  return filteredCars;
});
