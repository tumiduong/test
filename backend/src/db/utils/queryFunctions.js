import { createCustomersTable } from '../models/customers';
import { pool } from '../models/pool';

export const runQuery = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const createTables = () => runQuery([ createCustomersTable ]);