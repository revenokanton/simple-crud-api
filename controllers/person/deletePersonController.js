const Person = require('../../models/personModel');
const { errorHandler } = require('./errorController');
const { isValidUUID } = require('../../utils/utils');
const { resHeaders } = require('../../utils/config');

const deletePerson = async (req, res, id) => {
  try {
    if (!isValidUUID()) {
      errorHandler(res, 400, 'Id is not valid.');
    }

    const person = await Person._findById(id);

    if (!person) {
      errorHandler(res, 404, 'No person with given id found.');
    }

    await Person._delete(id);

    res.writeHead(204, resHeaders);
    return res.end(
      JSON.stringify({
        message: `Person ${person.name} with ${id} was removed.`,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deletePerson,
};
