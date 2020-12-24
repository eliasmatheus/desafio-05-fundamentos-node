import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /* eslint-disable no-param-reassign */
    /* eslint-disable no-return-assign  */
    const income = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') return (sum += transaction.value);
      return sum;
    }, 0);

    const outcome = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') return (sum += transaction.value);
      return sum;
    }, 0);
    /* eslint-enable no-return-assign  */
    /* eslint-enable no-param-reassign */

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTrasactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
