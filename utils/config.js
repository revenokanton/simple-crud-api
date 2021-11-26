const dbPath = './db/db.json';

const isProduction = process.env.APP_ENV === 'production';

const resHeaders = { 'Content-Type': 'application/json' };

module.exports = {
  dbPath,
  isProduction,
  resHeaders,
};
