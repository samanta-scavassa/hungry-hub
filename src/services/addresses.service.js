import axios from "axios";

class AddressService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://hungry-hub.adaptable.app'
    });
  }
  getAddress = (id) => {
    return this.api.get(`/api/addresses/${id}`);
  };
  getAddressByUser = (userId) => {
    return this.api.get(`/api/addresses/user/${userId}`);
  };
  createAddress = (requestBody) => {
    return this.api.post(`/api/addresses`, requestBody);
  };
  updateAddress = (id, requestBody) => {
    return this.api.put(`/api/addresses/${id}`, requestBody);
  };
  deleteAddress = (id) => {
    return this.api.delete(`/api/addresses/${id}`);
  };
}

const addressService = new AddressService();

export default addressService;
