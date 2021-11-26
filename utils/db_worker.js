const fs = require('fs');

const getPersonData = (req) =>
  new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });

const writeDataToDb = (filename, content) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(content), {
      encoding: 'utf8',
      flag: 'a+',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPersonData,
  writeDataToDb,
};
