import axios from "axios";

class MenuService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://hungry-hub.adaptable.app'
    });
  }

  postMenuItem = (requestBody) => {
    return this.api.post(`/api/menu-items`, requestBody);
  };

  getMenuItemById = (id) => {
    return this.api.get(`/api/menu-items/${id}`);
  };

  getMenuItemByRestaurantId = (id) => {
    return this.api.get(`/api/menu-items/restaurant/${id}`);
  };

  updateMenuItem = (id, requestBody) => {
    return this.api.put(`/api/menu-items/${id}`, requestBody);
  };

  deleteMenuItem = (id) => {
    return this.api.delete(`/api/menu-items/${id}`);
  };
}

const menuService = new MenuService();

export default menuService;
