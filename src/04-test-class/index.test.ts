// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 2000;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 2000;
    const withDraw = initialBalance + 1;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withDraw)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalanceToTransfer = 2000;
    const initialBalanceToReceive = 220;
    const accountToTransfer = getBankAccount(initialBalanceToTransfer);
    const accountToReceive = getBankAccount(initialBalanceToReceive);
    const transferAmount = initialBalanceToTransfer + 1;
    expect(() =>
      accountToTransfer.transfer(transferAmount, accountToReceive),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalanceToTransfer = 2000;
    const accountToTransfer = getBankAccount(initialBalanceToTransfer);
    const transferAmount = initialBalanceToTransfer - 1000;
    expect(() =>
      accountToTransfer.transfer(transferAmount, accountToTransfer),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 2000;
    const account = getBankAccount(initialBalance);
    const depositAmount = initialBalance - 1000;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 3000;
    const account = getBankAccount(initialBalance);
    const withdrawAmount = initialBalance - 1000;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalanceToTransfer = 2000;
    const initialBalanceToReceive = 220;
    const accountToTransfer = getBankAccount(initialBalanceToTransfer);
    const accountToReceive = getBankAccount(initialBalanceToReceive);
    const transferAmount = initialBalanceToTransfer - 500;
    accountToTransfer.transfer(transferAmount, accountToReceive);
    expect(accountToTransfer.getBalance()).toBe(
      initialBalanceToTransfer - transferAmount,
    );
    expect(accountToReceive.getBalance()).toBe(
      initialBalanceToReceive + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const balance = 1000;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(balance);
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const balance = 1000;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(balance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
