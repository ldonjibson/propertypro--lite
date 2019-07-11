/* eslint-disable no-tabs */
/* eslint-disable no-await-in-loop */
import pool from './config';
import property from '../model/property';
import users from '../model/users';

const Tables = `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phonenumber text NOT NULL,
    address text NOT NULL,
    accounttype text NOT NULL,
    isadmin text NOT NULL,
	  createdon TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS properties(
    id serial PRIMARY KEY,
    owner int REFERENCES users(id) ON DELETE CASCADE,
    type text NOT NULL,
    status text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    address text NOT NULL,
    price real NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    imageurl text NOT NULL
  );
`;

const queryDb = async (query) => {
  const res = await pool.query(query);
  return res;
};

const create = async (arr, table) => {
  try {
    await pool.query(Tables);
    for (let i = 0, len = arr.length; i < len; i += 1) {
      const values = Object.values(arr[i]);
      const keys = Object.keys(arr[i]);
      const query = `INSERT into ${table} (${keys}) values(${values})`;
      await queryDb(query);
    }
  } catch (error) {
    console.log(error);
  }
};

const createAllTables = async () => {
  try {
    await create(users, 'users');
    await create(property, 'properties');
    console.log('all tables have been created');
  } catch (error) {
    console.log(error);
  }
};

createAllTables();
