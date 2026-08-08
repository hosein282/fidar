import mysql from 'mysql2/promise';

// MySQL connection pool configuration
// Update these values in your .env.local file
const DB_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'biesss_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4_unicode_ci',
  decimalNumbers: true,
};

// Create a single shared connection pool
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}