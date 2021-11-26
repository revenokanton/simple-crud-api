const Person = require('../models/personsModel');

const { resHeaders } = require('../utils/config');
const { errorHandler } = require('./errorController');
const { isValidUUID } = require('../utils/utils');

const getPersons = async (req, res) => {
  try {
    const persons = await Person._findAll();

    res.writeHead(200, resHeaders);
    return res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
};

const getPerson = async (req, res, id) => {
  try {
    if (!isValidUUID()) {
      errorHandler(res, 400, 'Id is not valid.');
    }

    const person = await Person._findById(id);
    if (person) {
      res.writeHead(200, resHeaders);
      return res.end(JSON.stringify(person));
    }

    errorHandler(res, 404, 'No person with given id found.');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPersons,
  getPerson,
};
