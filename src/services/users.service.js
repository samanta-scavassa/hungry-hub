import axios from "axios";

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://hungry-hub.adaptable.app'
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

    updateUserPassword = (id, requestBody) => {
      return this.api.patch(`/api/users/${id}/password`, requestBody)
    }
}

const userService = new UserService();
     
export default userService;
