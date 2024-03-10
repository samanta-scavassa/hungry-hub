import axios from "axios";

class CartService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://hungry-hub.adaptable.app'
    });
  }

  postCart = (requestBody) => {
    return this.api.post(`/api/carts`, requestBody);
  };

  getCartById = (id) => {
    return this.api.get(`/api/carts/${id}`);
  };

  getCartByRestaurantId = (id) => {
    return this.api.get(`/api/carts/restaurant/${id}`);
  };

  getCartByUserId = (id) => {
    return this.api.get(`/api/carts/user/${id}`);
  };

  deleteCart = (id) => {
    return this.api.delete(`/api/carts/${id}`);
  };

}

const cartService = new CartService();

export default cartService;
