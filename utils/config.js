const dbPath = './db/db.json';

const isProduction = process.env.APP_ENV === 'production';

module.exports = {
  dbPath,
  isProduction,
};
