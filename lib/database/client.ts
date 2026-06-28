import Dexie from 'dexie';

import { Expense } from '@/types/expenses';

const db = new Dexie('CoinyDatabase') as Dexie & {
  expenses: Dexie.Table<Expense, number>;
};

db.version(1).stores({
  expenses: '++id, title, amount, category, date',
});

export default db;
