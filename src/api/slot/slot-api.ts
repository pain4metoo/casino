import { instance } from '../instance';

class SlotApi {
  public static async placeBet(bet: number) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const response: any = await instance.get(
        `/660/users/${localStorage.getItem('id')}`,
        config,
      );

      if (!response.data) {
        throw Error(response);
      }

      const currentBalance = response.data.balance;

      if (currentBalance - bet < 0) {
        throw Error('No Money');
      }

      const updateBalance = (currentBalance - bet).toFixed(2);

      const changeBalanceResponse: any = await instance.patch(
        `/660/users/${localStorage.getItem('id')}`,
        {
          balance: updateBalance,
        },
        config,
      );

      if (!changeBalanceResponse.data) {
        throw Error(response);
      }

      return changeBalanceResponse.data.balance;
    } catch (err) {
      console.log(err);
    }
  }
  public static async updateBalance(amount: number): Promise<void> {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const response: any = await instance.get(
        `/660/users/${localStorage.getItem('id')}`,
        config,
      );

      if (!response.data) {
        throw Error(response);
      }

      const currentBalance = +(+response.data.balance + amount).toFixed(2);

      const changeBalanceResponse: any = await instance.patch(
        `/660/users/${localStorage.getItem('id')}`,
        {
          balance: currentBalance,
        },
        config,
      );

      if (!changeBalanceResponse.data) {
        throw Error(response);
      }

      return changeBalanceResponse.data.balance;
    } catch (err) {
      console.log(err);
    }
  }
}

export default SlotApi;
