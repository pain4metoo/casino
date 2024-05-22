import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export type GiveMoneyType = {
  balance: number;
  increase: number;
};

class SlotApi {
  public static async placeBet(bet: number) {
    try {
      if (!bet) {
        throw Error('Bet is incorrect');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('casinoToken')}`,
        },
      };

      const response: AxiosResponse = await instance.get(
        `/660/users/${localStorage.getItem('casinoId')}`,
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
        `/660/users/${localStorage.getItem('casinoId')}`,
        {
          balance: +updateBalance,
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('casinoToken')}`,
        },
      };

      const response: AxiosResponse = await instance.get(
        `/660/users/${localStorage.getItem('casinoId')}`,
        config,
      );

      const data = response.data;

      if (!data) {
        throw Error(data);
      }

      const currentBalance = +(+response.data.balance + amount).toFixed(2);

      const changeBalanceResponse: AxiosResponse = await instance.patch(
        `/660/users/${localStorage.getItem('casinoId')}`,
        {
          balance: +currentBalance,
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

  public static async giveMeMoney(): Promise<GiveMoneyType | undefined> {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('casinoToken')}`,
        },
      };

      const userResponse: AxiosResponse = await instance.get(
        `/660/users/${localStorage.getItem('casinoId')}`,
        config,
      );

      const user = userResponse.data;

      if (!user) {
        throw Error(user);
      }

      const randomMoneyCount: number = Math.ceil(Math.random() * 1000);

      const changeBalanceResponse: AxiosResponse = await instance.patch(
        `/660/users/${localStorage.getItem('casinoId')}`,
        {
          balance: +user.balance + randomMoneyCount,
        },
        config,
      );

      const newBalanceData = changeBalanceResponse.data;

      if (!newBalanceData) {
        throw Error(newBalanceData);
      }

      const newBalance: GiveMoneyType = {
        balance: +newBalanceData.balance,
        increase: randomMoneyCount,
      };

      return newBalance;
    } catch (err) {
      console.log(err);
    }
  }
}

export default SlotApi;
