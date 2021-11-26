const http = require('http');
const { getPersons, getPerson } = require('./controllers/getPersonController');
const { getRoute, getId } = require('./utils/router');

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
      createPerson(req, res);
      break;
    }
    case 'UPDATE': {
      const id = getId(req.url);
      updatePerson(req, res, id);
      break;
    }
    case 'DELETE': {
      const id = getId(req.url);
      deletePerson(req, res, id);
      break;
    }
    default: {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not found' }));
      break;
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server starts on port ${PORT}`));

module.exports = server;
