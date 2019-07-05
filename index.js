class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    balance = this.transactions.reduce((a, b) => {
      return a + b.value;
    }, 0)
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() { return true }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.balance.amount - this.amount >= 0);

  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
