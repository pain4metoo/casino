import { Axios, AxiosResponse } from 'axios';
import { instance } from '../instance';

class SlotApi {
  public static async placeBet(bet: number) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const response: AxiosResponse = await instance.get(
        `/660/users/${localStorage.getItem('id')}`,
        config,
      );

      const data = response.data;

      if (!data) {
        throw Error(data);
      }

      const currentBalance = response.data.balance;

      if (currentBalance - bet < 0) {
        throw Error('No Money');
      }

      const updateBalance = (currentBalance - bet).toFixed(2);

      const changeBalanceResponse: AxiosResponse = await instance.patch(
        `/660/users/${localStorage.getItem('id')}`,
        {
          balance: updateBalance,
        },
        config,
      );

      const newBalanceData = changeBalanceResponse.data;

      if (!newBalanceData) {
        throw Error(newBalanceData);
      }

      return newBalanceData.balance;
    } catch (err) {
      console.log(err);
    }
  }
  public static async updateBalance(amount: number): Promise<void> {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const response: AxiosResponse = await instance.get(
        `/660/users/${localStorage.getItem('id')}`,
        config,
      );

      const data = response.data;

      if (!data) {
        throw Error(data);
      }

      const currentBalance = +(+response.data.balance + amount).toFixed(2);

      const changeBalanceResponse: AxiosResponse = await instance.patch(
        `/660/users/${localStorage.getItem('id')}`,
        {
          balance: currentBalance,
        },
        config,
      );

      const newBalanceData = changeBalanceResponse.data;

      if (!newBalanceData) {
        throw Error(newBalanceData);
      }

      return newBalanceData.balance;
    } catch (err) {
      console.log(err);
    }
  }
}

export default SlotApi;
