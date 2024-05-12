import { UserData } from './auth-types';
import { instance } from '../instance';
import { AxiosResponse } from 'axios';

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
        balance: 1000,
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
    } catch (err: any) {
      if (err.response.data) {
        return err.response.data;
      }
    }
  }
  public static async isAuthUser(email: string, password: string) {
    try {
      const body = {
        email,
        password,
      };

      const response: AxiosResponse = await instance.post('/login', body);

      const data = response.data;

      if (!data) {
        throw new Error(data);
      }

      return data;
    } catch (err: any) {
      if (err.response.data) {
        return err.response.data;
      }
    }
  }

  public static async isAuthMe() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const response: any = await instance.get(
        `/users/${localStorage.getItem('id')}`,
        config,
      );

      if (!response.data) {
        throw Error(response);
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  public static isAuthMeCheckData() {
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      return true;
    }

    return false;
  }
}

export default AuthController;
