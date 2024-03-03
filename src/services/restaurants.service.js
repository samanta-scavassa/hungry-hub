import axios from "axios";

class RestaurantService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });
  }

  postRestaurant = (requestBody) => {
    return this.api.post(`/api/restaurants`, requestBody);
  };

  getAllRestaurants = () => {
    return this.api.get(`/api/restaurants`);
  };

  getRestaurantsByCategory = (category) => {
    return this.api.get(`/api/restaurants/category/${category}`);
  };

  getRestaurantsByOperatingHours = (day, from, to) => {
    return this.api.get(
      `/api/restaurants/operating-hours?day=${day}&openingHour=${from}&closingHour=${to}`
    );
  };

  getRestaurant = (id) => {
    return this.api.get(`/api/restaurants/${id}`);
  };

  updateRestaurant = (id, requestBody) => {
    return this.api.put(`/api/restaurants/${id}`, requestBody);
  };

  deleteRestaurant = (id) => {
    return this.api.delete(`/api/restaurants/${id}`);
  };
}

const restaurantService = new RestaurantService();

export default restaurantService;
