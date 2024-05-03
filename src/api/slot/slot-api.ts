import { instance } from '../instance';

class SlotApi {
  public static async placeBet(bet: number) {
    try {
      const response: any = await instance.get(
        `/users/${localStorage.getItem('id')}`,
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
        `/users/${localStorage.getItem('id')}`,
        {
          balance: updateBalance,
        },
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
