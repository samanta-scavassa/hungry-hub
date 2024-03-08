import axios from "axios";

class OrderItemDetailsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });
  }

  postOrderItem = (requestBody) => {
    return this.api.post(`/api/order-items-details`, requestBody);
  };

  getOrderItemById = (id) => {
    return this.api.get(`/api/order-items-details/${id}`);
  };

  getOrderItemByCartId = (id) => {
    return this.api.get(`/api/order-items-details/cart/${id}`);
  };

  updateOrderItem = (id, requestBody) => {
    return this.api.patch(`/api/order-items-details/${id}`, requestBody);
  }

  deleteOrderItem = (id) => {
    return this.api.delete(`/api/order-items-details/${id}`);
  }

}

const orderItemDetailsService = new OrderItemDetailsService();

export default orderItemDetailsService;
