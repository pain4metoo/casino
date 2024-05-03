import { instance } from '../instance';

class SlotApi {
  public static async placeBet(bet: number, balance: number) {
    try {
      const response: any = await instance.get(
        `/600/users/${localStorage.getItem('id')}`,
      );

      if (!response.data) {
        throw Error(response);
      }

      const currentBalance = response.data.balance;

      if (currentBalance - bet < 0) {
        throw Error('No Money');
      }

      const changeBalanceResponse: any = await instance.patch(
        `/600/users/${localStorage.getItem('id')}`,
        {
          balance: currentBalance - bet,
        },
      );

      if (!changeBalanceResponse.data) {
        throw Error(response);
      }

      return +changeBalanceResponse.data.balance.toFixed(2);
    } catch (err) {
      console.log(err);
    }
  }
}

export default SlotApi;
