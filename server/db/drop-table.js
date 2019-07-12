/* eslint-disable no-console */
import pool from './config';

const dropUsersTable = 'DROP TABLE users';
const dropPropertiesTable = 'DROP TABLE properties CASCADE';

async function deleteTables() {
  try {
    await pool.query(dropPropertiesTable);
    await pool.query(dropUsersTable);
    console.log('Tables deleted');
  } catch (error) {
    console.log('Tables didn\'t drop');
  }
}

deleteTables();
