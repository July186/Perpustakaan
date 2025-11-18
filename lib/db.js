// Get the client
import mysql from 'mysql2/promise';

// Create the connection pool to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'db_buku',
});

export default connection
