const Person = require('../../models/personModel');
const { getPersonData } = require('../../utils/db_worker');
const { errorHandler } = require('./errorController');
const { isValidUUID } = require('../../utils/utils');
const { resHeaders } = require('../../utils/config');

const updatePerson = async (req, res, id) => {
  try {
    if (!isValidUUID()) {
      errorHandler(res, 400, 'Id is not valid.');
    }

    const person = await Person._findById(id);

    if (!person) {
      errorHandler(res, 404, 'No person with given id found.');
    }

    const body = await getPersonData(req);

    const { name, age, hobbies } = JSON.parse(body);

    const personData = {
      name: name || person.name,
      age: age || person.age,
      hobbies: hobbies || person.hobbies,
    };

    const updatedPerson = await Person._update(id, personData);

    res.writeHead(200, resHeaders);
    return res.end(JSON.stringify(updatedPerson));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updatePerson,
};
