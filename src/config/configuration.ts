export default () => ({
    database: {
      host: process.env.DB_HOST || 'localhost', 
      port: parseInt(process.env.DB_PORT || '5432', 10), 
    },
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret', 
  });