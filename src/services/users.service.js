import axios from "axios";

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
        });

    }
    getUser = id => {
      return this.api.get(`/api/users/${id}`);
    };
   
    updateUser = (id, requestBody) => {
      return this.api.put(`/api/users/${id}`, requestBody);
    };
   
    deleteUser = id => {
      return this.api.delete(`/api/users/${id}`);
    };
}

const userService = new UserService();
     
export default userService;
