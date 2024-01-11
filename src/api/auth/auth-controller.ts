import { UserData } from './auth-types';
import instance from '../instance';
import axios from 'axios';

class AuthController {
  public static async createNewUser(email: string, password: string) {
    try {
      const user: Partial<UserData> = {
        email,
        password,
        avatar: null,
        coins: 0,
        achievements: [],
        exp: 0,
        level: 1,
        isAuth: false,
      };

      const response = instance.post('/register', {
        body: JSON.stringify(user),
      });

      const data = await response;

      if (!data) {
        throw new Error(`${data}`);
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }
  public static async isAuthUser(login: string, password: string) {
    try {
      const body = {
        login,
        password,
      };

      const response = axios.post('/login', {
        body: JSON.stringify(body),
      });

      const data = await response;

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
