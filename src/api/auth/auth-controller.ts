import { UserData } from './auth-types';
import { instance } from '../instance';

class AuthController {
  public static async createNewUser(email: string, password: string) {
    try {
      const user: Partial<UserData> = {
        email: email,
        password: password,
        avatar: null,
        coins: 0,
        achievements: [],
        exp: 0,
        level: 1,
      };

      const response = await instance.post('/register', user);

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

      const response = await instance.post('/login', body);

      const data = response.data;

      if (!data) {
        throw new Error(data);
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default AuthController;
