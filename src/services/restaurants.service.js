import axios from "axios";

class RestaurantService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://hungry-hub.adaptable.app",
    });
  }

  postRestaurant = (requestBody) => {
    return this.api.post(`/api/restaurants`, requestBody);
  };

  getAllRestaurants = (rating, category) => {
    console.log(this.api.baseURL);
    return this.api.get(
      `/api/restaurants?rating=${rating}&category=${category}`
    );
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
