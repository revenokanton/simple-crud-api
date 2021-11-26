const http = require('http');
const { getRoute, getId } = require('./utils/router');
const { getPersons, getPerson } = require('./controllers/getPersonController');
const { createPerson } = require('./controllers/createPersonController');
const { updatePerson } = require('./controllers/updatePersonController');
const { deletePerson } = require('./controllers/deletePersonController');

const server = http.createServer(async (req, res) => {
  const route = getRoute({ url: req.url, method: req.method });
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
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Not found' }));
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server starts on port ${PORT}`));

module.exports = server;
