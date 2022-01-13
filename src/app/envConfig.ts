interface IEnvConfig {
  // Server
  NODE_ENV: string;
  FRONTEND_URL: string;
  API_PORT: string;
  SOCKET_PORT: string;

  // User
  DEFAULT_COIN: string;

  // Database
  DB_URI: string;
  DB_OPTIONS: string;
}

export default (): IEnvConfig => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5500',
  API_PORT: process.env.API_PORT || '5000',
  SOCKET_PORT: process.env.SOCKET_PORT || '3000',

  DEFAULT_COIN: process.env.DEFAULT_COIN || '20',

  DB_URI: process.env.DB_URI,
  DB_OPTIONS: process.env.DB_OPTIONS,
});
