const http = require('http');
const { getRoute, getId } = require('./utils/router');
const { resHeaders } = require('./utils/config');
const {
  getPersons,
  getPerson,
} = require('./controllers/person/getPersonController');
const { createPerson } = require('./controllers/person/createPersonController');
const { updatePerson } = require('./controllers/person/updatePersonController');
const { deletePerson } = require('./controllers/person/deletePersonController');

const server = http.createServer(async (req, res) => {
  const route = getRoute({ url: req.url, method: req.method });
  process.on('uncaughtException', function (error) {
    console.log(error.stack);
  });
  switch (route) {
    case 'GET_ALL': {
      await getPersons(req, res);
      break;
    }
    case 'GET_BY_ID': {
      const id = getId(req.url);
      await getPerson(req, res, id);
      break;
    }
    case 'CREATE': {
      await createPerson(req, res);
      break;
    }
    case 'UPDATE': {
      const id = getId(req.url);
      await updatePerson(req, res, id);
      break;
    }
    case 'DELETE': {
      const id = getId(req.url);
      await deletePerson(req, res, id);
      break;
    }
    default: {
      res.writeHead(404, resHeaders);
      return res.end(JSON.stringify({ message: 'Not found' }));
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server starts on port ${PORT}`));

module.exports = server;
