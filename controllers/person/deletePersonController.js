const Person = require('../../models/personModel');
const { errorHandler } = require('./errorController');
const { isValidUUID } = require('../../utils/utils');
const { resHeaders } = require('../../utils/config');

const deletePerson = async (req, res, id) => {
  try {
    if (isValidUUID(id)) {
      const person = await Person._findById(id);

      if (person) {
        await Person._delete(id);

        res.writeHead(204, resHeaders);
        return res.end(
          JSON.stringify({
            message: `Person ${person.name} with ${id} was removed.`,
          }),
        );
      } else {
        errorHandler(res, 404, 'No person with given id found.');
      }
    } else {
      errorHandler(res, 400, 'Id is not valid.');
    }
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, 'Internal server error.');
  }
};

module.exports = {
  deletePerson,
};
