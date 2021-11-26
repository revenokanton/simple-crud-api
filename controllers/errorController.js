const { resHeaders } = require('../utils/config');

const errorHandler = (res, errorCode, errorMessage) => {
  res.writeHead(errorCode, resHeaders);
  return res.end(JSON.stringify({ message: errorMessage }));
};

module.exports = {
  errorHandler,
};
