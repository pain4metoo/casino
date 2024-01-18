import { UserData } from './auth-types';
import { instance } from '../instance';

class AuthController {
  public static async createNewUser(
    email: string,
    password: string,
    login: string,
  ) {
    try {
      const user: Partial<UserData> = {
        email: email,
        login: login,
        password: password,
        avatar: null,
        coins: 1000,
        achievements: [],
        exp: 0,
        level: 1,
      };

      const response: any = await instance.post('/register', user);

      const data = response.data;

      if (!data) {
        throw new Error(`${data}`);
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }
  public static async isAuthUser(email: string, password: string) {
    try {
      const body = {
        email,
        password,
      };

      const response: any = await instance.post('/login', body);

      const data = response.data;

      if (!data) {
        throw new Error(data);
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  public static async isAuthMe(email: string, id: string) {
    try {
      const body: any = {
        email,
        id,
      };

      const response: any = await instance.get(`/660/users/${id}`, body);

      if (!response.data) {
        throw new Error(response);
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default AuthController;
